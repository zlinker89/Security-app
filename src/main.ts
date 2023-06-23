import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, transformOptions: {enableImplicitConversion: true} }));
  const config = new DocumentBuilder()
    .setTitle('Security App')
    .setDescription('Aplicacion base de seguridad multi-tenant')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://franklin:Expertosip%402023.@localhost/`],
  //     queue: 'email',
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });
 
  // app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
