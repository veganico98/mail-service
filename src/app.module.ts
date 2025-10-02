import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./modules/mail/infrastructure/mail.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 🔑 deixa .env acessível em toda a aplicação
    }),
    MailModule,
  ],
})
export class AppModule {}
