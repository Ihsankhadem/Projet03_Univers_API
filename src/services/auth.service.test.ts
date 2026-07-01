import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";
import AuthService from "./auth.service.js";
import UserModel from "../models/user.model.js";
import { AppError } from "../errors/AppError.js";

// On mock le modèle UserModel pour éviter d'appeler la vraie base de données
vi.mock("../models/user.model");

// On mock bcrypt pour éviter de faire de vrais hash
beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SECRET = "secret_test";
});
// vi.mock en general est utilisé pour remplacer un module par un mock, ce qui permet de contrôler son comportement dans les tests.

// Tests register : Email déjà utilisé
describe("register", () => {
  // l21 sert a vérifier si l'email existe déjà dans la base de données. Si c'est le cas, on renvoie une erreur 409 (Conflict)
  it("renvoie une erreur si l'email existe déjà", async () => {
    // On mock la fonction findByEmail pour qu'elle renvoie un utilisateur existant
    const hashedPassword = await bcrypt.hash("password123", 10);
    // vi.mocked ici permet de typer correctement la fonction mockée pour éviter les erreurs de type.
    // On utilise mockResolvedValue pour simuler une promesse résolue avec un utilisateur existant.
    vi.mocked(UserModel.findByEmail).mockResolvedValue({
      id_user: 1,
      name: "John",
      email: "john@test.fr",
      password: hashedPassword,
      role: "rédacteur",
      must_change_password: false,
      created_at: "",
    } as any);
    // On appelle la fonction register avec un email déjà utilisé et on capture l'erreur renvoyée.
    const error = await AuthService.register({
      name: "John",
      email: "john@test.fr",
      password: "password123",
    }).catch((e) => e);
    // On vérifie que c'est bien une AppError 409
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(409);
  });

  //   create user
  it("retourne l'id du nouvel utilisateur", async () => {
    vi.mocked(UserModel.findByEmail).mockResolvedValue(null);

    vi.mocked(UserModel.create).mockResolvedValue(42);

    const result = await AuthService.register({
      name: "John",
      email: "john@test.fr",
      password: "password123",
    });

    expect(result.id).toBe(42);
  });
});

// verifier le hash du mot de passe
it("stocke un mot de passe hashé", async () => {
  vi.mocked(UserModel.findByEmail).mockResolvedValue(null);

  vi.mocked(UserModel.create).mockResolvedValue(1);

  await AuthService.register({
    name: "John",
    email: "john@test.fr",
    password: "password123",
  });

  const userSent = vi.mocked(UserModel.create).mock.calls[0][0];

  expect(userSent.password).not.toBe("password123");
});

//Tests login Utilisateur absent

describe("login", () => {
  it("renvoie une erreur si l'utilisateur est introuvable", async () => {
    vi.mocked(UserModel.findByEmail).mockResolvedValue(null);

    const error = await AuthService.login(
      "inconnu@test.fr",
      "password123",
    ).catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
  });

  // Tests login Mot de passe incorrect
  it("renvoie une erreur si le mot de passe est invalide", async () => {
    const hashedPassword = await bcrypt.hash("bon_password", 10);

    vi.mocked(UserModel.findByEmail).mockResolvedValue({
      id_user: 1,
      name: "John",
      email: "john@test.fr",
      password: hashedPassword,
      role: "rédacteur",
      must_change_password: false,
      created_at: "",
    } as any);

    const error = await AuthService.login(
      "john@test.fr",
      "mauvais_password",
    ).catch((e) => e);

    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(401);
  });

  // Tests login Mot de passe correct
  it("retourne un token JWT", async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    vi.mocked(UserModel.findByEmail).mockResolvedValue({
      id_user: 1,
      name: "John",
      email: "john@test.fr",
      password: hashedPassword,
      role: "rédacteur",
      must_change_password: false,
      created_at: "",
    } as any);

    const result = await AuthService.login("john@test.fr", "password123");

    expect(typeof result.token).toBe("string");
    expect(result.token.split(".")).toHaveLength(3);
  });
});
