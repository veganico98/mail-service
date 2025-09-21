import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
      options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'mails_queue',
      queueOptions: { durable: true },
      noAck: false
    },
  })
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://guest:guest@localhost:5672'],
  //     queue: 'mails_queue',
  //     queueOptions: { durable: true },
  //     exchange: 'auth_exchange',
  //     exchangeType: 'fanout',
  //     // routingKey: "auth_exchange"
  //   },
  // });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
