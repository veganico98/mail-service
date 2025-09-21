import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class UserEventsController {
  constructor(private readonly mailService: MailService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const msg = context.getMessage();

    console.log('📩 Recebido evento user.created no Mail:', data);

    // Dispara o e-mail de boas-vindas
    await this.mailService.send({
      to: data.email,
      subject: "Seja Bem Vindo!",
      template: "welcome",
      data: {
        name: data.name,
      }
    });

    // Confirma que processou a mensagem
    // channel.ack(msg);
  }
}
