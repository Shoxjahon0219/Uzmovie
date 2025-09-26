import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function start() {
  const app = await NestFactory.create(AppModule);

  const PORT = Number(process.env.PORT) ?? 3000;

  const config = new DocumentBuilder()
    .setTitle("Uzmovie API")
    .setDescription("The uzmovie API description")
    .setVersion("1.0")
    .addTag("")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`http://localhost:${PORT}/api/docs`);
  });
}
start();
