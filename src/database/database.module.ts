import { Module, Global } from '@nestjs/common';

// Configuracion de PSQL Nativa
import { Client } from 'pg';
import config from '../config';
import { ConfigType } from '@nestjs/config';

// Configuracion de PSQL con TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '123456';
const API_KEY_PROD = 'ValPROD';

// Global dice que seran providers globales
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configType: ConfigType<typeof config>) => {
        const { dbName, dbUser, dbPass, dbPort, dbHost } = configType.postgres;
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPass,
          database: dbName,
          // entities: [],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'POSTGRES',
      useFactory: (configType: ConfigType<typeof config>) => {
        const { dbName, dbUser, dbPass, dbPort, dbHost } = configType.postgres;

        const client = new Client({
          user: dbUser,
          host: dbHost,
          database: dbName,
          password: dbPass,
          port: dbPort,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  // hacemos que el API_KEY sea utilizado desde cualquier modulo
  exports: ['API_KEY', 'POSTGRES', TypeOrmModule],
})
export class DatabaseModule {}
