export class Usuario {

    constructor(
      public _id?: number,
      public dni?: string,
      public name?: string,
      public email?: string,
      public password?: string,
      public rol?: string,
      public createdAt?: any,
      public updatedAt?: any,
      public indActivo?: boolean
      ) {
  
    }
  
  }