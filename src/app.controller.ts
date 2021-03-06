import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pruebas')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  newEndpoint() {
    return 'nuevo endpoint';
  }

  @Get('/ruta/')
  hello() {
    return 'con /slash/';
  }

  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
