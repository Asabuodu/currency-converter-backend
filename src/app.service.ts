import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

interface ExchangeRateResponse {
  conversion_result: number;
  conversion_rate: number;
  base_code: string;
  target_code: string;
}

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async convertCurrency(
    from: string,
    to: string,
    amount: number,
  ): Promise<{ result: number; rate: number }> {
    const apiKey = this.configService.get<string>("EXCHANGE_RATE_API_KEY");
    const apiUrl = this.configService.get<string>("EXCHANGE_RATE_API_URL");  
    
    const url = `${apiUrl}/${apiKey}/pair/${from}/${to}/${amount}`;
    const response = await firstValueFrom(
      this.httpService.get<ExchangeRateResponse>(url)
    );

    return {
      result: response.data.conversion_result,
      rate: response.data.conversion_rate,
    };
  }
}