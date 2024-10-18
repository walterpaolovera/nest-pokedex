import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
		new ValidationPipe({ 
		  whitelist: true, //esta configuración hace que eliminen las propiedades que vienen en el request y que coinciden con la definición del DTO
		  forbidNonWhitelisted: true, // esta configuración retorna un error si llegan propiedades que no existen en el DTO
		  transform: true, //estas 2 configuraciones transforman los valores que vienen el query-parameters
		  transformOptions: {
			enableImplicitConversion: true,
		  }
		})
	);

  await app.listen( process.env.PORT );
  console.log(`App running in port ${ process.env.PORT }`);
}
bootstrap();
