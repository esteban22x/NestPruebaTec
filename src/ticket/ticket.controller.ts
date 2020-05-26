import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TicketDTO } from './ticket.dto';
import { User } from 'src/user/user.decorator';
import { TicketService } from './ticket.service';
import { AuthGuard } from 'src/auth-guard';

@Controller('ticket')
export class TicketController {

    constructor(private readonly ticketService : TicketService){}
    
    @Post()
    @UseGuards(new AuthGuard())
    crear(@Body() datos : TicketDTO, @User() usuarioActual){
        return this.ticketService.crearTicket(datos,usuarioActual);
    }
}
