import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AppConstants } from '../util/app.constants';
import { GenericResponse } from '../model/generic-response.model';
import { Usuario } from '../model/usuario.model';
import { Observable } from 'rxjs';
import { Reniec } from '../model/reniec.model';
import { Movimiento } from '../model/movimiento.model';

@Injectable()
export class MovimientoService {

  constructor(private http: HttpClient) { }

  getLstMovimiento(idCuenta): Observable<HttpResponse<GenericResponse<Array<Movimiento>>>> {
    return this.http.get<GenericResponse<Array<Movimiento>>>(`${AppConstants.ApiUrls.MOVIMIENTO_GET_LST}${idCuenta}`, {
      observe: 'response'
    });
  }

  getMovimiento(id): Observable<HttpResponse<GenericResponse<Movimiento>>> {
    return this.http.get<GenericResponse<Movimiento>>(`${AppConstants.ApiUrls.MOVIMIENTO_GET_MOVIMIENTO}${id}`, {
      observe: 'response'
    });
  }

  indActivoMovimiento(id): Observable<HttpResponse<GenericResponse<Movimiento>>> {
    return this.http.get<GenericResponse<Movimiento>>(`${AppConstants.ApiUrls.MOVIMIENTO_IND_ACTIVO}${id}`, {
      observe: 'response'
    });
  }

}