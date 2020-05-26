import { Module } from '@nestjs/common';
import { SoporteService } from './soporte.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaEntity } from 'src/marca/marca.entity';
import { Soporte } from 'src/soporte/soporte.entity';
import { SoporteController } from './soporte.controller';

@Module({
  providers: [SoporteService],
  imports: [TypeOrmModule.forFeature([Soporte,MarcaEntity])],
  controllers: [SoporteController],
  exports: [TypeOrmModule]
})
export class SoporteModule {}
