import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppDataSource } from "./database/data-source";
import { readFileSync } from 'node:fs';

async function bootstrap() {

  // Enable HTTPS protocol
  const httpsOptions = {
    key: readFileSync('./docker/ngnix/ssl/private/privkey.pem'),
    cert: readFileSync('./docker/ngnix/ssl/certs/fullchain.pem'),
  };

  const app = await NestFactory.create(AppModule, {httpsOptions});

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle("NextUpFit Platform 🏋️‍♀️ - API")
    .setDescription("API documentation for the NextUpFit application.")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  await app.listen(443);

  console.log(`Application is running on: https://moneydey-npf-api`);
}

bootstrap();
