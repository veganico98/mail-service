import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { MailService } from './mail.service';
import { UserEventsController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: `ERP Faex <${process.env.MAIL_FROM}>`,
        },
        template: {
          dir: resolve(__dirname, 'templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [UserEventsController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
 