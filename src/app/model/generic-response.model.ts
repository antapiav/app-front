export class GenericResponse<T> {

    constructor(
      public code?: number,
      public message?: string,
      public header?: any,
      public body?: T) { }
  }