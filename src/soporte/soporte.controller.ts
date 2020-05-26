import { Controller, Post , Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SoporteService } from './soporte.service';
import { Soporte } from './soporte.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('soporte')
export class SoporteController {

    constructor(
        private readonly SoporteService : SoporteService
    ){}

    @Post()
    @ApiBody({type : [Soporte]})
    crearNuevo(@Body('soporte') SoporteCuerpo : Soporte,@Body('marca') marcaId : number ){
        return this.SoporteService.crear(SoporteCuerpo,marcaId);
    }
    @Get()
    encontrarTodos(){
        return this.SoporteService.encontrarTodos();
    }
    @Get(':id')
    encontrarUno(@Param('id') soporteId : number){
        return this.SoporteService.encontrarUno(soporteId);
        
    }
    @Put()
    actualizar(@Body() soporteCompleto: Soporte){
        
        return this.SoporteService.actualizar(soporteCompleto.id,soporteCompleto);
    }
    
    @Delete(':id')
    borrar(@Body('id') id : number){

    }


    
}