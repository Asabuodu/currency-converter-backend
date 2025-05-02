import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("convert")
  async convertCurrency(
    @Query("from") from: string,
    @Query("to") to: string,
    @Query("amount") amount: number,
  ) {
    return this.appService.convertCurrency(from, to, amount);
  }
}
