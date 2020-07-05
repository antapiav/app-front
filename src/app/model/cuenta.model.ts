import { Usuario } from './usuario.model';

export class Cuenta {

    constructor(
        public _id?: number,
        public nroCuenta?: string,
        public nroCCI?: string,
        public nombre?: string,
        public descripcion?: string,
        public montoDisponible?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public indActivo?: boolean,
        public user?: Usuario
        ) {
  
    }
  
}