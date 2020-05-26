import { Controller, Post, Get, Body, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { AuthGuard } from 'src/auth-guard';
import { User } from './user.decorator';
@Controller()
export class UserController {

    constructor(private readonly UserService : UserService){}

    @Post('login')
    login(@Body() datos : UserDTO){
        return this.UserService.login(datos);    
    }
    
    @Post('registrar')
    registrar(@Body() datos : UserDTO){
        return this.UserService.registrar(datos);

    }
    @Post('registrar/tecnico')
    @UseGuards(new AuthGuard())
    registrarTecnico(@Body() datos : UserDTO, @User() usuario){
        console.log(usuario);
        return this.UserService.registrar(datos,usuario.rol);

    }

    @Put('usuario')
    modificar(@Body('nuevoUsuario') datos : UserDTO, @Body('id') id : number){
        return this.UserService.modificar(datos,id);
    }

    @UseGuards(new AuthGuard())
    @Get('users')
    mostrarTodo(){
        
        return this.UserService.mostrarTodo();
    }

}
