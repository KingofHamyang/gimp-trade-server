import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { types } from 'pg'

async function bootstrap() {

  types.setTypeParser(1700, function(val) {
    return parseFloat(val);
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
