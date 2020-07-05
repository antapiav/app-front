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
import { Movimiento } from 'src/app/model/movimiento.model';
import { MovimientoService } from 'src/app/services/movimiento.services';
import { Cuenta } from 'src/app/model/cuenta.model';

@Component({
  selector: 'app-modal-detail-movimiento',
  templateUrl: './modal-detail-movimiento.component.html',
  styleUrls: ['./modal-detail-movimiento.component.css']
})
export class ModalDetailMovimientoComponent implements OnInit {

    public disabledStatus: boolean = false;
    public operation: string;
    public options: any;
    public titulo: string;
    public movimiento: Movimiento;
    public response: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private commonsService: CommonsService,
    private movimientoService: MovimientoService
  ) {
    this.movimiento = new Movimiento();
    this.movimiento.cuenta = new Cuenta();
  }

  ngOnInit() {
    setTimeout(() => {
        (this.options.indActivo == true) ? this.disabledStatus = false : this.disabledStatus = true;
        this.getDetalleMovimiento(this.options._id);
    });
  }

  getDetalleMovimiento(id){
    this.commonsService.openModalLoading();
    this.movimientoService.getMovimiento(id)
      .pipe(
      catchError(error => {
        this.commonsService.openModalErrorServer();
        throw error;
      }),
      finalize(() => {this.commonsService.closeModalLoading()}))
      .subscribe((data) => {
        this.movimiento = data.body.body;
        this.movimiento.fecha = AppUtils.convertDateToString(this.movimiento.fecha);
      });
  }

  async btnOperacion(){
    const  a = await this.commonsService.openModalConfirmQuestion(AppMessages.GENERIC_BAJA_QUESTION);
    if(a.isConfirmed){
      this.commonsService.openModalLoading();
        this.movimientoService.indActivoMovimiento(this.movimiento._id)
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