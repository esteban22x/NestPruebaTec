import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { MarcaEntity } from './marca.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";


@Injectable()

export class MarcaService{
    
    constructor(
        @InjectRepository(MarcaEntity)
        private MarcaRepository: Repository<MarcaEntity>
    ){}
    encontrarTodos(): Promise<MarcaEntity[]>{
        return this.MarcaRepository.find();
    } 
    async encontrarUno(id: number): Promise<MarcaEntity>{
        const resultado = await this.MarcaRepository.findOne(id);
        return resultado; 

    } 
    async crear(nuevaMarca : string): Promise<MarcaEntity>{
        const marquita = await this.MarcaRepository.create({nombre: nuevaMarca});
        const resultado = await this.MarcaRepository.save(marquita);
        return resultado;
    }
    async modificar(id: number, nuevaMarca: MarcaEntity): Promise<MarcaEntity>{
        const marcaSelec = await this.MarcaRepository.findOne(id);
        this.MarcaRepository.merge(marcaSelec,nuevaMarca);
        const resultado = await this.MarcaRepository.save(nuevaMarca);
        return resultado;
    }
    async eliminar(id: number): Promise<DeleteResult>{
        const resultado = await this.MarcaRepository.delete(id);
        return resultado;
    }

}