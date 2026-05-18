// // serfvices/mail.service.ts
// import ContactModel from '../models/user.model.js';
// import nodemailer from 'nodemailer';

// class ContactService {

//   static async sendContactEmail({ name, email, message }) {

//     // sauvegarde BDD
//     await ContactModel.create({
//       name,
//       email,
//       message
//     });

//     const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//     }
//     });

// await transporter.sendMail({
//   from: process.env.MAIL_USER,
//   to: process.env.MAIL_TO,
//   subject: `Message de ${name}`,
//   text: `
//     Nom : ${name}
//     Email : ${email}

//     ${message}
//     `
//     });
//   }

//   static async getAllMessages() {
//     return await ContactModel.findAll();
//   }

//   static async deleteMessage(id) {

//     const deleted = await ContactModel.delete(id);

//     if (!deleted) {
//       throw new Error("Message introuvable");
//     }

//     return true;
//   }
// }

// export default ContactService;
