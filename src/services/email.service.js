import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER, PORT_EMAIL } from "../config/config.js";

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      port: PORT_EMAIL,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async send(destinatario, asunto, mensaje, adjuntos = []) {
    const emailOptions = {
      from: EMAIL_USER,
      to: destinatario,
      subject: asunto,
      text: mensaje,
    };

    if (adjuntos.length > 0) {
      emailOptions.attachments = adjuntos;
    }

    await this.transport.sendMail(emailOptions);
  }
}

export const emailService = new EmailService();
