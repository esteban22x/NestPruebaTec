import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { UserMO } from "./user.dto";

export type tipoRoles = "tecnico" | "cliente";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @CreateDateColumn()
    creado_el: Date; 

    @Column({type: 'text', unique: true})
    nombreusuario: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: ["cliente" , "tecnico"],
        default: "cliente"
    })
    rol: tipoRoles;

    @BeforeInsert()
    async crearHash(){
        this.password = await bcrypt.hash(this.password,7);
    }

    mostrarObjeto(mostrarToken : boolean = true): UserMO{
        const {id,creado_el,nombreusuario,token} = this;
        const resp : UserMO =  {id,creado_el,nombreusuario};
        if (mostrarToken){
            resp.token = token;
        }
        return resp;
    }
    async compararPassword(intentoPassword : string){
        return await bcrypt.compare(intentoPassword,this.password);
    }
    private get token(){
        const {id,nombreusuario,rol} = this;
        return jwt.sign({id,nombreusuario,rol}, process.env.LLAVE_SECRETA, {expiresIn: '2d' });
    }

    




}