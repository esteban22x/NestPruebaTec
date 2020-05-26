import { Controller, Post, Body, Header, Get,Param, Put, Delete, Request } from "@nestjs/common";
import { MarcaService } from "./marca.service";
import { MarcaEntity } from "./marca.entity";
import { ApiBody } from "@nestjs/swagger";

@Controller("marca")
export class MarcaController{
    constructor(private readonly MarcaService: MarcaService) {};
    
    
    @Get()
    encontrarTodos(){
            return this.MarcaService.encontrarTodos();    
    }
    @Get(':id')
    encontrarUno(@Param('id') marcaId : number){
        return this.MarcaService.encontrarUno(marcaId);
        
    }
    @Post()
    @ApiBody({type: String})
    crearNuevo(@Body('nombre') nombreMarca : string ){
        return this.MarcaService.crear(nombreMarca);
    }
    @Put()
    actualizarMarca(@Body() marcaCompleta: MarcaEntity){
        
        return this.MarcaService.modificar(marcaCompleta.id,marcaCompleta);
    }
    @Delete(':id')
    borrarMarca(@Param('id') idMarca: number) {
        return this.MarcaService.eliminar(idMarca);
    }
}