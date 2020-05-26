import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "./user.entity";
import { UserDTO, UserMO } from './user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private UserRepository : Repository<User> ){}

    async login(datos: UserDTO){
        const nombreusuario = datos.nombreusuario;
        const password = datos.password;
        const user = await this.UserRepository.findOne({where:{nombreusuario}});
        if (!user || !user.compararPassword(password) ){
            throw new HttpException(" El usuario/contrasena no fueron encontrados",HttpStatus.BAD_REQUEST);
        }
        return user.mostrarObjeto();
    }
    async registrar(datos: UserDTO, registrarTecnico? : string): Promise<UserMO>{
        const nombreusuario = datos.nombreusuario;
        let user = await this.UserRepository.findOne({where:{nombreusuario}});
        if (user){
            throw new HttpException("El usuario ingresado ya existe",HttpStatus.BAD_REQUEST);
        }
        console.log(`El valor del rol actual es de ${registrarTecnico}`);
        if (registrarTecnico == 'tecnico'){
            datos.rol = "tecnico";
        }
        user = this.UserRepository.create(datos);
        await this.UserRepository.save(user);
        return user.mostrarObjeto();
    }

    async modificar(datos: UserDTO,id: number){
        let userEncontrado = this.UserRepository.findOne(id);
        if (!userEncontrado){
            throw new HttpException(" no se encontro el id del usuario", HttpStatus.NOT_FOUND);;
        }
        return await this.UserRepository.update(id,datos);
    }

    
    async mostrarTodo(): Promise<UserMO[]> {
        const listaUsuarios = await this.UserRepository.find();
        return listaUsuarios.map(user => user.mostrarObjeto(false) );
    }
    
}
