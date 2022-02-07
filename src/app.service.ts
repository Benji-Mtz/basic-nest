import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

import config from './config';
import { ConfigType } from '@nestjs/config';

// Tipados para lo que regresa la conexion
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
    // private config: ConfigService,
    @Inject(config.KEY) private configType: ConfigType<typeof config>,
    @Inject('POSTGRES') private pgClient: Client,
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
  // Pasar de callback a promesa para responder a la API
  getTasks() {
    return new Promise((resolve, reject) => {
      this.pgClient.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
