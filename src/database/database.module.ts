import { Module, Global } from '@nestjs/common';

const API_KEY = '123456';
const API_KEY_PROD = 'ValPROD';

// Global dice que seran providers globales
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  // hacemos que el API_KEY sea utilizado desde cualquier modulo
  exports: ['API_KEY'],
})
export class DatabaseModule {}
