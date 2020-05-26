import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from "typeorm";
import { ticket } from './ticket.entity';
import { TicketDTO } from './ticket.dto';
import { User } from 'src/user/user.entity';


@Injectable()
export class TicketService {

    constructor(
        @InjectRepository(ticket) private ticketRepository : Repository<ticket>,
        @InjectRepository(User) private userRepository : Repository<User>

    ){
    }

    async crearTicket(nuevoTicket : TicketDTO, cliente : number){
        const ticket = this.ticketRepository.create(nuevoTicket);
        ticket.tecnico = await getConnection()
        .createQueryBuilder()
        .select("user")
        .where("user.rol = :rol", {rol: "tecnico"})
        .orderBy("RAND()")
        .getOne();
        const instaFecha = new Date();
        ticket.cliente = await this.userRepository.findOne(cliente);
        instaFecha.setDate(instaFecha.getDate() + 3);
        ticket.fecha_visita =  instaFecha;
        return await this.ticketRepository.save(ticket);
    }
}
