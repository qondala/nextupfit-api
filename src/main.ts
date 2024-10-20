import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { EventEmitter } from "typeorm/platform/PlatformTools";

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

  // Démarrage de l'application sur le port 3000
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
