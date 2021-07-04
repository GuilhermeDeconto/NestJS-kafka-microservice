import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all-exception.filter';
import { HttpExceptionFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('App')
    .setDescription('The app API description')
    .setVersion('1.0')
    .addTag('app')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter());

  await app.listen(process.env.SERVER_PORT || 8000);
}
bootstrap();