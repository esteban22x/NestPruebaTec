import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ticket } from './ticket.entity';
import { User } from 'src/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ticket,User])],
    providers: [TicketService],
    controllers: [TicketController]
})
export class TicketModule {}
