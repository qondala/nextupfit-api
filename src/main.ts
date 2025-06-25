import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { readFileSync } from 'node:fs';

import { AppDataSource } from "./database/data-source";
import { AppModule } from "./app.module";


async function bootstrap() {

  // Enable HTTPS protocol
  const httpsOptions = {
    key: readFileSync('./certs/privkey.pem'),
    cert: readFileSync('./certs/fullchain.pem'),
  };

  const app = await NestFactory.create(AppModule, {httpsOptions});

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle("NextUpFit Platform 🏋️‍♀️ - API")
    .setDescription("API documentation for the NextUpFit application.")
    .setVersion("1.0")
    .addServer("https://api.npf.moneydey.ltd", "Production")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("doc", app, document);

  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  await app.listen(443);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
