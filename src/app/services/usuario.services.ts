import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AppConstants } from '../util/app.constants';
import { GenericResponse } from '../model/generic-response.model';
import { Usuario } from '../model/usuario.model';
import { Observable } from 'rxjs';
import { Reniec } from '../model/reniec.model';
import { Login } from '../model/login.module';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getLstUsuario(tipo, dato): Observable<HttpResponse<GenericResponse<Array<Usuario>>>> {
    return this.http.get<GenericResponse<Array<Usuario>>>(`${AppConstants.ApiUrls.USUARIO_GET_LST}`+
        `${tipo}`+
        `${AppConstants.ApiUrls.USUARIO_GET_LST_2}`+
        `${dato}`, {
      observe: 'response'
    });
  }

  getUsuario(idUsuario): Observable<HttpResponse<GenericResponse<Usuario>>> {
    return this.http.get<GenericResponse<Usuario>>(`${AppConstants.ApiUrls.USUARIO_GET_USUARIO}${idUsuario}`, {
      observe: 'response'
    });
  }

  getDataReniec(numDocumento): Observable<HttpResponse<GenericResponse<Reniec>>> {
    return this.http.get<GenericResponse<Reniec>>(`${AppConstants.ApiUrls.CONSULTA_RENIEC_RUC}${numDocumento}`, {
      observe: 'response'
    });
  }

  indActivoUsuario(idUsuario): Observable<HttpResponse<GenericResponse<Usuario>>> {
    return this.http.get<GenericResponse<Usuario>>(`${AppConstants.ApiUrls.USUARIO_IND_ACTIVO}${idUsuario}`, {
      observe: 'response'
    });
  }

  postPutOperation(usuario: Usuario, operation: string): Observable<HttpResponse<GenericResponse<Usuario>>>{
    if(operation===AppConstants.Modal.OP_SAVE){
      return this.postUsuario(usuario);
    }else if(operation===AppConstants.Modal.OP_UPDATE){
      return this.putUsuario(usuario);
    }
  }

  postLogin(login: Login): Observable<HttpResponse<GenericResponse<Usuario>>> {
    return this.http.post<GenericResponse<Usuario>>(`${AppConstants.ApiUrls.USUARIO_LOGIN}`, login,{
      observe: 'response'
    });
  }

  postUsuario(usuario: Usuario): Observable<HttpResponse<GenericResponse<Usuario>>> {
    return this.http.post<GenericResponse<Usuario>>(`${AppConstants.ApiUrls.USUARIO_INSERTAR_MODIFICAR}`, usuario,{
      observe: 'response'
    });
  }

  putUsuario(usuario: Usuario): Observable<HttpResponse<GenericResponse<Usuario>>> {
    return this.http.put<GenericResponse<Usuario>>(`${AppConstants.ApiUrls.USUARIO_INSERTAR_MODIFICAR}`, usuario,{
      observe: 'response'
    });
  }

}