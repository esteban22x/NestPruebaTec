import { Soporte } from "src/soporte/soporte.entity";
import { UserDTO } from "src/user/user.dto";
import { User } from "src/user/user.entity";

export type TipoServicio = "instalacion" | "mantenimiento";
export class TicketDTO{

    tipo_servicio: TipoServicio;
    soporte : Soporte;
    cliente: User;
    tecnico: User;  
    fecha_visita: Date;
    
    
}
