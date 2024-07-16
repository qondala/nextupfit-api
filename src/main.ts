import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle("FitCoaching Platform 🏋️‍♀️ - API")
    .setDescription("API documentation for the fitness platform")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Démarrage de l'application sur le port 3000
  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
