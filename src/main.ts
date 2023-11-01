import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": "true",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": "Content-Type, Accept",
    "credentials": true,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Online Parties Booking')
    .setDescription('Documentation API For Online Parties Booking')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Online Parties Booking',
    customfavIcon: 'https://firebasestorage.googleapis.com/v0/b/onlinebookingparty.appspot.com/o/TestPost%2FScreenshot%202023-10-30%20122619.png?alt=media&token=64587562-b883-4b83-85c7-bef07f6283cd&_gl=1*1foxis4*_ga*MTkyMzQ4MTYyMS4xNjk1OTcwNzE4*_ga_CW55HF8NVT*MTY5ODY0MzU5OS42NS4xLjE2OTg2NDM2NjQuNTguMC4w',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
    }
  await app.listen(3000);
}
bootstrap();
