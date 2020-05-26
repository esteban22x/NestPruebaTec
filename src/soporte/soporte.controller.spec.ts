import { Test, TestingModule } from '@nestjs/testing';
import { SoporteController } from './soporte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soporte } from './soporte.entity';
import { MarcaEntity } from 'src/marca/marca.entity';
import { SoporteService } from './soporte.service';

describe('Soporte Controller', () => {
  let controller: SoporteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoporteController],
      imports: [TypeOrmModule.forFeature([Soporte,MarcaEntity])],
      providers: [SoporteService]
    }).compile();

    controller = module.get<SoporteController>(SoporteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
