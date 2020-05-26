import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization){
        return false;
    } 
    request.user = await this.validarToken(request.headers.authorization);
    return true;
  }

  async validarToken(headerAut : string){
      if (headerAut.split(' ')[0] !== 'Bearer'){
          throw new HttpException("El token es de tipo invalido",HttpStatus.FORBIDDEN);
      }
      const token = headerAut.split(' ')[1];
      try {
        const decodificar = jwt.verify(token,process.env.LLAVE_SECRETA);
        return decodificar;    
      } catch (error) {
          throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }
  }
}