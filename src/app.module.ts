import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./modules/mail/infrastructure/mail.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
  ],
})
export class AppModule {}
