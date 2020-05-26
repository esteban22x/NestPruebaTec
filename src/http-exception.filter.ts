import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Response,Request } from "express";

@Catch()

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const respuesta = ctx.getResponse<Response>();
        const peticion = ctx.getRequest<Request>();
        const estado = exception instanceof HttpException ?
        exception.getStatus() 
        : HttpStatus.INTERNAL_SERVER_ERROR;
        

        respuesta
        .status(estado)
        .json({
            status: estado,
            timestamp : new Date().toISOString(),
            ruta: peticion.url,
            mensaje: (exception instanceof HttpException) ? exception.getResponse() : "Oops! Ha ocurrido algo malo"
        });

        
    }
}