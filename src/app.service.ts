import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async convertCurrency(from: string, to: string, amount: number) {
    const apiKey = this.configService.get<string>('EXCHANGE_RATE_API_KEY');
    const apiUrl = this.configService.get<string>('EXCHANGE_RATE_API_URL');
    
    const url = `${apiUrl}/${apiKey}/pair/${from}/${to}/${amount}`;
    const response = await firstValueFrom(this.httpService.get(url));
    
    return {
      result: response.data.conversion_result,
      rate: response.data.conversion_rate,
    };
  }
}