import { NestFactory } from '@nestjs/core';
import { SeedingService } from './seed.service';
import { AppModule } from '../../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedingService = app.get(SeedingService);
  await seedingService.seed();
  await app.close();
}

bootstrap();
