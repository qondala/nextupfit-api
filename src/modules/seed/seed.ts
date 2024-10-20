import { NestFactory } from "@nestjs/core";
import { SeedingService } from "./seed.service";
import { SeedModule } from "./seed.module";

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  const seedingService = app.get(SeedingService);
  await seedingService.seed();
  await app.close();
}

bootstrap();
