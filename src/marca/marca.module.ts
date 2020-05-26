import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MarcaController } from "./marca.controller";
import { MarcaService } from "./marca.service";
import { MarcaEntity } from './marca.entity';


@Module({
    imports: [TypeOrmModule.forFeature([MarcaEntity])],
    controllers: [MarcaController],
    providers: [MarcaService],
    exports: [TypeOrmModule]
})
export class MarcaModule{}