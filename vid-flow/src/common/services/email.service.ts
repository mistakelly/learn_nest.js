import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { sendEmailDto } from '../dto/send_email.dto';
import { Constants } from 'src/constants';

@Injectable()
export class AuthEmailService {
  private logger = new Logger(AuthEmailService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  // Method to send email verification link
  async sendEmail(emailDto: sendEmailDto) {
    const payload = { email: emailDto.recipient, action: 'verify-email' };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const verificationURL = `${Constants.BASE_URL}/verify-email?token=${token}`;

    // email content
    const mailOptions = {
      to: emailDto.recipient,
      subject: 'Email Verification',
      text: `Click the link to verify your email: ${verificationURL}`,
      html: `<p>Click the link to verify your email: <a href="${verificationURL}">${verificationURL}</a></p>`,
    };

    // Send the email
    try {
      const info = await this.mailerService.sendMail(mailOptions);
      this.logger.log('Email sent successfully', info.messageId);
    } catch (err) {
      this.logger.error(`Error sending mail: ${err}`);
      throw err;
    }
  }
}
