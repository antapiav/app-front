import { Cuenta } from './cuenta.model';

export class Movimiento {

    constructor(
      public _id?: number,
      public nroMovimiento?: string,
      public fecha?: any,
      public detalle?: string,
      public monto?: number,
      public indActivo?: boolean,
      public cuenta?: Cuenta
      ) {
  
    }
  
  }