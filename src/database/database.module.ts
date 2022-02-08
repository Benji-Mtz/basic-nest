import { Module, Global } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import config from '../config';
import { ConfigType } from '@nestjs/config';

const API_KEY = '123456';
const API_KEY_PROD = 'ValPROD';

/*async function run() {
  const tasksCollection = database.collection('tasks');
  const tasks = await tasksCollection.find().toArray();
  console.log(tasks);
}
run();*/

// Global dice que seran providers globales
@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27027', {
    //   user: 'root',
    //   pass: 'root',
    //   dbName: 'store',
    // }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, port, host, connection } = configService.mongo;

        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, port, host, connection } = configService.mongo;

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  // hacemos que el API_KEY sea utilizado desde cualquier modulo
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
