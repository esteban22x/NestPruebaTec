import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Soporte } from "src/soporte/soporte.entity";
import { User } from "src/user/user.entity";

export type TipoServicio = "instalacion" | "mantenimiento";
@Entity()
export class ticket{

    @PrimaryGeneratedColumn()
    id : string;

    @PrimaryGeneratedColumn("uuid")
    token_seguimiento: string;

    @Column({
        nullable: false
    })
    fecha_visita: Date;

    @Column({
        type: "enum",
        enum: ["instalacion","mantenimiento"],
        default: "instalacion"
    })
    tipo_servicio: TipoServicio;

    @ManyToOne(type => Soporte)
        soporte: Soporte;

    @ManyToOne(type => User)
        tecnico : User;
    
    @ManyToOne(type => User)
        cliente : User;

    
}