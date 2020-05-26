import * as request from 'supertest'; 
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MarcaModule } from './marca.module';
import { MarcaService } from './marca.service';
import { MarcaEntity } from './marca.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

describe('MarcaController', () => {
    
    let app: INestApplication;
    let marcaservice = { 
        encontrarTodos: ()=> ["pioner","filis"],
        encontrarUno: ()=> ["pioner"],
        crear: ()=> ["acme"],
        modificar: ()=> ["1","ACME"],
        eliminar: ()=> []
     };

    
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot({
                
                    type: "mysql",
                    host: "localhost",
                    port: 3306,
                    username: "root",
                    password: "rootapi",
                    database: "sonry",
                    entities: [MarcaEntity],
                    synchronize: true,
                    logging: true
                  
            }),MarcaModule],
        })
        .overrideProvider(MarcaService)
        .useValue(marcaservice)
        .compile();
        app = moduleRef.createNestApplication();
        await app.init();
    });
    it('/GET marca ', ()=> {
        return request(app.getHttpServer())
        .get('/marca')
        .expect(200)
        .expect(marcaservice.encontrarTodos())
    });
    it('/GET marca/1 ', ()=> {
        return request(app.getHttpServer())
        .get('/marca/1')
        .expect(200)
        .expect(marcaservice.encontrarUno())
    });
    it('/POST marca ', ()=> {
        return request(app.getHttpServer())
        .post('/marca')
        .field('nombre','ACME')
        .expect(201)
        .expect(marcaservice.crear())
    });
    it('/PUT marca ', ()=> {
        return request(app.getHttpServer())
        .put('/marca')
        .field('id','1')
        .field('nombre','ACME')
        .expect(200)
        .expect(marcaservice.modificar())
    });
    it('/DELETE marca ', ()=> {
        return request(app.getHttpServer())
        .delete('/marca/1')
        .expect(200)
    });


    afterEach(async () => {
        await app.close();
    })
});