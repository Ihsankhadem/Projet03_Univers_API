import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendTemporaryPasswordEmail(
  email: string,
  name: string,
  tempPassword: string,
) {
  await transporter.sendMail({
    from: `"Univers" <${process.env.MAIL_USER}>`,

    to: email,

    subject: "Votre accès rédacteur Univers",

    html: `
      <div style="
        font-family:sans-serif;
        padding:30px;
      ">

        <h2>
          Bonjour ${name}
        </h2>

        <p>
          Votre compte rédacteur
          vient d’être créé.
        </p>

        <p>
          Voici votre mot de passe
          temporaire :
        </p>

        <div style="
          margin:20px 0;
          padding:16px;
          border-radius:12px;
          background:#f3f4f6;
          font-size:22px;
          font-weight:bold;
          width:max-content;
        ">
          ${tempPassword}
        </div>

        <p>
          Connectez-vous puis
          modifiez votre mot
          de passe immédiatement.
        </p>

        <a
          href="${process.env.FRONT_URL}/login"
          style="
            display:inline-block;
            margin-top:20px;
            background:#7c3aed;
            color:white;
            padding:12px 20px;
            border-radius:10px;
            text-decoration:none;
          "
        >
          Se connecter
        </a>

      </div>
    `,
  });
}
