import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AppConstants } from '../util/app.constants';
import { GenericResponse } from '../model/generic-response.model';
import { Observable } from 'rxjs';
import { Cuenta } from '../model/cuenta.model';

@Injectable()
export class CuentaService {

  constructor(private http: HttpClient) { }

  getLstCuenta(idUsuario): Observable<HttpResponse<GenericResponse<Array<Cuenta>>>> {
    return this.http.get<GenericResponse<Array<Cuenta>>>(`${AppConstants.ApiUrls.CUENTA_GET_LST}${idUsuario}`, {
      observe: 'response'
    });
  }

  getCuenta(id): Observable<HttpResponse<GenericResponse<Cuenta>>> {
    return this.http.get<GenericResponse<Cuenta>>(`${AppConstants.ApiUrls.CUENTA_GET_CUENTA}${id}`, {
      observe: 'response'
    });
  }

  indActivoCuenta(id): Observable<HttpResponse<GenericResponse<Cuenta>>> {
    return this.http.get<GenericResponse<Cuenta>>(`${AppConstants.ApiUrls.CUENTA_IND_ACTIVO}${id}`, {
      observe: 'response'
    });
  }

}