import { Component, OnInit, Renderer2, HostListener, Output, EventEmitter, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppConstants } from 'src/app/util/app.constants';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { GenericResponse } from 'src/app/model/generic-response.model';
import { Usuario } from 'src/app/model/usuario.model';
import { CommonsService } from 'src/app/services/commons.service';
import { UsuarioService } from 'src/app/services/usuario.services';
import { AppUtils } from 'src/app/util/app.utils';
import { AppMessages } from 'src/app/util/app-messages';
import { CuentaService } from 'src/app/services/cuenta.services';
import { Cuenta } from 'src/app/model/cuenta.model';

@Component({
  selector: 'app-modal-detail-cuenta',
  templateUrl: './modal-detail-cuenta.component.html',
  styleUrls: ['./modal-detail-cuenta.component.css']
})
export class ModalDetailCuentaComponent implements OnInit {

    public disabledStatus: boolean = false;
    public operation: string;
    public options: any;
    public titulo: string;
    public cuenta: Cuenta;
    public response: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private commonsService: CommonsService,
    private cuentaService: CuentaService
  ) {
      this.cuenta = new Cuenta();
      this.cuenta.user = new Usuario();
  }

  ngOnInit() {
    setTimeout(() => {
        (this.options.indActivo == true) ? this.disabledStatus = false : this.disabledStatus = true;
        this.getDetalleCuenta(this.options._id);
    });
  }

  getDetalleCuenta(id){
    this.commonsService.openModalLoading();
    this.cuentaService.getCuenta(id)
      .pipe(
      catchError(error => {
        this.commonsService.openModalErrorServer();
        throw error;
      }),
      finalize(() => {this.commonsService.closeModalLoading()}))
      .subscribe((data) => {
        this.cuenta = data.body.body;
        this.cuenta.createdAt = AppUtils.convertDateToString(this.cuenta.createdAt);
        this.cuenta.updatedAt = AppUtils.convertDateToString(this.cuenta.updatedAt);     
      });
  }

  async btnOperacion(){
    const  a = await this.commonsService.openModalConfirmQuestion(AppMessages.GENERIC_BAJA_QUESTION);
    if(a.isConfirmed){
      this.commonsService.openModalLoading();
    this.cuentaService.indActivoCuenta(this.cuenta._id)
        .pipe(
          catchError(error => {
            this.commonsService.openModalErrorServer();
            throw error;
          }),
          finalize(() => {this.commonsService.closeModalLoading()}))
        .subscribe((data) => {
            switch(data.body.code){
              case 200:
                this.response = true;
                this.bsModalRef.hide();
                //this.commonsService.openModalExitoOperation();
                break;
              default:
                this.response = false;
                this.commonsService.openModalErrorOperation(data.body.message);
                break;
            }
        });
    }
  }
  
}