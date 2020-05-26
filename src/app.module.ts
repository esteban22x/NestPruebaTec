import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm'
import { MarcaModule } from './marca/marca.module';
import { SoporteController } from './soporte/soporte.controller';
import { SoporteModule } from './soporte/soporte.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { TicketModule } from './ticket/ticket.module';


@Module({
  imports: [MarcaModule,SoporteModule,UserModule,TicketModule,TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection){}
}
