const nodemailer = require("nodemailer");

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `${process.env.API_URL} активация`,
      text: "",
      html:
        `
        <div style="font-family: inherit; margin: 8px 0;">
          <h1 style="color: teal;">Активация аккаунта ${to}</h1>
          <a href="${link}" style="
                            padding: 8px 36px;
                            font-size: 24px;
                            font-family: inherit;
                            color: yellow;
                            background-color: teal; 
                            text-decoration: none; 
                            border-radius: 8px;
                            "
          >Подтверить email</a>
        </div>
        `
    })
  }
};

module.exports = new MailService();