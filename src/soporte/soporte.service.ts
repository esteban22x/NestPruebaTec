import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Soporte } from './soporte.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from "typeorm";
import { MarcaEntity } from 'src/marca/marca.entity';
import { MarcaService } from 'src/marca/marca.service';

@Injectable()
export class SoporteService {

    constructor(
        @InjectRepository(Soporte)
        private SoporteRepository : Repository<Soporte>,
        @InjectRepository(MarcaEntity)
        private MarcaRepository : Repository<MarcaEntity>
    ){}

     private async crearMarcaSiNoExiste(soporteObtenido : Soporte) {
        const nuevaMarca = new MarcaService(this.MarcaRepository);
        if(!nuevaMarca.encontrarUno(soporteObtenido.marca.id) && soporteObtenido.marca.nombre){
            
            const marcaCreado = await nuevaMarca.crear(soporteObtenido.marca.nombre);
            return marcaCreado;

        }else if (!soporteObtenido.marca.nombre){
            throw new HttpException('Debes completar al menos el nombre de marca',HttpStatus.NOT_FOUND);
        }
        return false;
    }

    encontrarTodos(): Promise<Soporte[]>{
        return this.SoporteRepository.find({ relations: ['marca']});
    }
    async encontrarUno(id: number): Promise<Soporte>{
        const resultado = await this.SoporteRepository.findOne({ where: {id}, relations: ['marca'] });
        return resultado; 
    }
    async actualizar(id: number,nuevoSoporte: Soporte): Promise<any>
    {
        delete nuevoSoporte.id;
        let soporteObtenido = await this.SoporteRepository.findOne(id);
        if (!soporteObtenido){
            throw new HttpException(" no se encontro el id del soporte", HttpStatus.NOT_FOUND);
        }
        let resultadoMarca = this.crearMarcaSiNoExiste(nuevoSoporte);
        if ( resultadoMarca instanceof MarcaEntity){
            nuevoSoporte.marca = resultadoMarca;
        }
        
        const resultado = await this.SoporteRepository.update(id,nuevoSoporte);
        return resultado;
    } 
    async crear(soporteObtenido: Soporte, idMarca: number): Promise<Soporte>{
        let marcaS = await this.MarcaRepository.findOne(idMarca);
        let resultadoMarca = this.crearMarcaSiNoExiste(soporteObtenido);
        if ( resultadoMarca instanceof MarcaEntity){
            marcaS = resultadoMarca;
        }
        const soporte = this.SoporteRepository.create({...soporteObtenido,marca : marcaS});
        return await this.SoporteRepository.save(soporte);
    }
    async borrar(id : number): Promise<DeleteResult>{
        return await this.SoporteRepository.delete(id);
    }
    
}
