import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      validate: (config: Record<string, unknown>) => ({
        EXCHANGE_RATE_API_KEY: config["EXCHANGE_RATE_API_KEY"] as string,
        EXCHANGE_RATE_API_URL: config["EXCHANGE_RATE_API_URL"] as string,
      }),
    }),
    HttpModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}