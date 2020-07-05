import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.services';
import { catchError, finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/model/usuario.model';
import { AppUtils } from 'src/app/util/app.utils';
import { AppConstants } from 'src/app/util/app.constants';
import { CommonsService } from 'src/app/services/commons.service';
import { ModalDetailUsuarioComponent } from './detail/modal-detail-usuario.component';
import { AppMessages } from 'src/app/util/app-messages';
import { GenericResponse } from 'src/app/model/generic-response.model';
import { GenericSearch } from 'src/app/model/generic-search.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {  

    public lstUsuario: Array<Usuario>;
    public genericSearch: GenericSearch;
    public hideTableLoad: boolean = true;

  constructor(
      private usuarioService: UsuarioService,
      private commonsService: CommonsService,
      private router: Router
    ) { 
        this.genericSearch = new GenericSearch();
        this.genericSearch.tipo = "0";
        this.genericSearch.dato = AppConstants.String.STRING_VACIO;
    }

  ngOnInit(): void {
    if(AppUtils.validSession())
    {
      this.reqLstUsuario();
    }else{
        this.router.navigate(['/login']);
    }
  }

  btnNuevo(){
    const params = {
        titulo: AppConstants.Modal.TITLE_MODAL_REGISTRAR_USUARIO,
        operation: AppConstants.Modal.OP_SAVE,
        hideRol: false
      };
      this.commonsService.openModalLarge(
        ModalDetailUsuarioComponent,
        params)
        .subscribe((response) => {
          if(response){
            this.commonsService.openModalExitoOperation();
            this.reqLstUsuario();
          }
        });
  }

  btnDetalle(usuario: Usuario){
    const params = {
        titulo: AppConstants.Modal.TITLE_MODAL_DETALLE_USUARIO,
        operation: AppConstants.Modal.OP_DETAIL,
        options: usuario
    };
    this.commonsService.openModalLarge(
        ModalDetailUsuarioComponent,
        params)
    .subscribe((response) => {
    });
  }
  btnEditar(usuario: Usuario){
    const params = {
        titulo: AppConstants.Modal.TITLE_MODAL_UDATE_USUARIO,
        operation: AppConstants.Modal.OP_UPDATE,
        options: usuario
    };
    this.commonsService.openModalLarge(
        ModalDetailUsuarioComponent,
        params)
    .subscribe((response) => {
        if(response){
            this.commonsService.openModalExitoOperation();
            this.reqLstUsuario();
          }
    });
  }
  
  async btnAlta(usuario: Usuario){
    const  a = await this.commonsService.openModalConfirmQuestion(AppMessages.GENERIC_BAJA_QUESTION);
    if(a.isConfirmed){
      this.commonsService.openModalLoading();
    this.usuarioService.indActivoUsuario(usuario._id)
        .pipe(
          catchError(error => {
            this.commonsService.openModalErrorServer();
            throw error;
          }),
          finalize(() => {this.commonsService.closeModalLoading()}))
        .subscribe((data) => {
            switch(data.body.code){
              case 200:
                this.reqLstUsuario();
                this.commonsService.openModalExitoOperation();
                break;
              default:
                this.commonsService.openModalErrorOperation(data.body.message);
            }
        });
    }
  }

  reqLstUsuario() {  
    this.hideTableLoad = true;
    this.lstUsuario = new Array();
    this.usuarioService.getLstUsuario(this.genericSearch.tipo, this.genericSearch.dato)
    .pipe(
      catchError(error => {
        console.log('error occured:', error);
        throw error;
      }),
      finalize(() => {
        this.hideTableLoad = false;
      })
    ).subscribe((data) => {
        this.lstUsuario = data.body.body;
        for(let i in this.lstUsuario){
            this.lstUsuario[i].createdAt = AppUtils.convertDateToString(this.lstUsuario[i].createdAt);
            this.lstUsuario[i].updatedAt = AppUtils.convertDateToString(this.lstUsuario[i].updatedAt);               
        }
      });
  }
  
}
