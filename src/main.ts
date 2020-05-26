import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const opciones = new DocumentBuilder()
  .setTitle('Instalacion de Soportes para TVs')
  .setDescription('Esta es el API basica de Sonry')
  .setVersion('1.0.0')
  .build();
  const documento = SwaggerModule.createDocument(app,opciones);
  SwaggerModule.setup('api',app,documento);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
