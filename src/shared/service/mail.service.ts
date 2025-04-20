import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject?: string, context?: Object) {
    const mailOptions: ISendMailOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      template: "./templates/confirmation",
      context: context,
    };
    await this.mailerService.sendMail(mailOptions);
  }
}
