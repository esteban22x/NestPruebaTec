import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { MarcaEntity } from "../marca/marca.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Soporte {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id : number;
    
    @ApiProperty({
        description: 'El modelo de soporte para TVs'
    })
    @Column()
    modelo : string; 

    @ApiProperty({
        description: 'Desde cuantas pulgadas soporta el Soporte para TVs'
    })
    @Column()
    pulgadasMin : number;

    @ApiProperty({
        description: 'Hasta cuantas pulgadas soporta el Soporte para TVs'
    })
    @Column()
    pulgadasMax : number;

    @ApiProperty({
        description: 'Una breve descripcion del Soporte para TVs'
    })
    @Column()
    descripcion : string;

    @ApiProperty({
        description: 'El precio base para la instalacion de soportes para TVs',
        minimum : 10000,
    })
    @Column()
    precio_instalacion: number; 

    
    @ManyToOne(type => MarcaEntity, marca => marca.soportes)
        marca: MarcaEntity;
    


}
