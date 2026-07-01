import { describe, it, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import { authenticate } from "./auth.middleware.js";

// On définit une clé JWT pour les tests
process.env.JWT_SECRET = "secret_test";

describe("authenticate", () => {
  const mockRes = () => {
    // Petite fonction utilitaire pour mocker res.status().json()
    const res: any = {};
    // res.status() doit renvoyer res pour permettre le chaînage
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);

    return res;
  };

  it("renvoie 401 si aucun token n'est fourni", () => {
    // req.headers est vide → pas de Authorization
    const req: any = {
      headers: {},
    };

    const res = mockRes();
    const next = vi.fn(); // next() ne doit PAS être appelé

    authenticate(req, res, next);
    // Le middleware doit renvoyer 401
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("renvoie 401 si le token est invalide", () => {
    // On simule un token invalide
    const req: any = {
      headers: {
        authorization: "Bearer token_invalide",
      },
    };

    const res = mockRes();
    const next = vi.fn(); // next() ne doit PAS être appelé

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("appelle next() si le token est valide", () => {
    // On génère un token valide pour un utilisateur avec id 1 et rôle "administrateur"
    const token = jwt.sign(
      {
        id: 1,
        role: "administrateur",
      },
      process.env.JWT_SECRET!,
    );
    // On simule une requête avec ce token dans l'en-tête Authorization
    const req: any = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = mockRes();
    const next = vi.fn();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    // Le middleware doit avoir ajouté req.user
    expect(req.user).toMatchObject({
      id: 1,
      role: "administrateur",
    });
  });
});
