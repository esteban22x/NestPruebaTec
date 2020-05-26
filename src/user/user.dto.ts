export type tipoRoles = "tecnico" | "cliente";
export class UserDTO{

    nombreusuario   : string;
    password        : string;
    rol?            : tipoRoles; 
}
export class UserMO{
    id: string;
    nombreusuario : string;
    creado_el: Date;
    token? : string; 
}