import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { EventEmitter } from "typeorm/platform/PlatformTools";
import { AppDataSource } from "./database/data-source";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle("NextUpFit Platform 🏋️‍♀️ - API")
    .setDescription("API documentation for the NextUpFit application.")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  EventEmitter.defaultMaxListeners = 1000;

  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  // Démarrage de l'application sur le port 3000
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
