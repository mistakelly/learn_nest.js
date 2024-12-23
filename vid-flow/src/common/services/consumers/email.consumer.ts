import {
  Processor,
  Process,
  OnQueueFailed,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Logger, OnApplicationShutdown } from '@nestjs/common';
import { Job } from 'bull';
import { Constants } from 'src/constants';
import { AuthEmailService } from '../email.service';
import { sendEmailDto } from 'src/common/dto/send_email.dto';

@Processor(Constants.MAIL_QUEUE)
export class UserVerifyEmailProcessor implements OnApplicationShutdown {
  private logger = new Logger(UserVerifyEmailProcessor.name);
  constructor(private readonly emailService: AuthEmailService) {}

  @OnQueueCompleted()
  async handleJobCompleted(job: Job, err: Error): Promise<void> {
    this.logger.log(
      `Verification email sent successfully to ${job.data.recipient}`,
    );
  }

  @OnQueueFailed()
  async handleJobFailed(job: Job, err: Error): Promise<void> {
    this.logger.error(`Job ${job.id} failed: ${(err.message, err.stack)}`);
  }

  @Process('send_verification_email')
  async sendVerificationEmail(job: Job<sendEmailDto>) {
    try {
      let progress = 0;
      this.logger.log(`Processing job ${job.id}`);

      const { id, recipient } = job.data;

      // sendi email
      await this.emailService.sendEmail({ id, recipient });
    } catch (err) {
      this.logger.error(`Failed to process job ${job.id}: ${err.message}`);

      // Move job to failed queue for debugging or retrying
      await job.moveToFailed({ message: err.message });
      throw err;
    }
  }

  onApplicationShutdown() {
    // this.logger.log('Shutting down gracefully...');
    // TODO: perform cleanup tasks here like stopping the queue workers or finishing any pending jobs
  }
}
