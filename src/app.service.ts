import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

import config from './config';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    // private config: ConfigService,
    @Inject(config.KEY) private configType: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}
  getHello(): string {
    // console.log(this.tasks);
    // const apiKey = this.config.get<string>('API_KEY');
    // const db = this.config.get('DATABASE_NAME');

    const apiKey = this.configType.apiKey;
    const db = this.configType.database.name;
    const port = this.configType.database.port;
    // return `Valor inyectado a traves de toda la app con useValue: ${this.apiKey}`;
    return `Valor inyectado a traves de toda la app con ConfigType: ${apiKey} , ${db} y ${port}`;
  }
  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
