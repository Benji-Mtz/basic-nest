import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

import config from './config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    // private config: ConfigService,
    @Inject(config.KEY) private configType: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    // console.log(this.tasks);
    // const apiKey = this.config.get<string>('API_KEY');
    // const db = this.config.get('DATABASE_NAME');

    const apiKey = this.configType.apiKey;
    const db = this.configType.database.name;
    // return `Valor inyectado a traves de toda la app con useValue: ${this.apiKey}`;
    return `Valor inyectado a traves de toda la app con ConfigModule: ${apiKey} y ${db}`;
  }
}
