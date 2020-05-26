import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Soporte } from '../soporte/soporte.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class MarcaEntity{
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'El nombre de la marca a crear'
    })
    @Column()
    nombre: string;

    @ApiPropertyOptional()
    @OneToMany(type => Soporte, soporte => soporte.marca)
    soportes: Soporte[]

}