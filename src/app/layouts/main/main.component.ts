import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule, NavigationExtras } from '@angular/router';

import { catchError, finalize } from 'rxjs/operators';
import { CommonsService } from 'src/app/services/commons.service';
import { AppUtils } from 'src/app/util/app.utils';
import { Cuenta } from 'src/app/model/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta.services';
import { AppConstants } from 'src/app/util/app.constants';
import { ModalDetailCuentaComponent } from './detail/modal-detail-cuenta.component';
import { MovimientoComponent } from 'src/app/modulo-movimiento/movimiento/movimiento.component';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public hideItem: boolean = false;
    public cuenta: Cuenta;
    public lstCuenta: Array<Cuenta>;
    public block: Array<string>;
    public usuario: Usuario;

  constructor(
    private cuentaService: CuentaService,
    private commonsService: CommonsService,
    private router: Router
  ) { 
    this.usuario = new Usuario();
    this.cuenta = new Cuenta();
    this.lstCuenta = new Array();
    this.block = new Array();
  }

  ngOnInit(): void {
      if(AppUtils.validSession())
      {
        this.usuario = AppUtils.getSessionStorage();
        this.reqLstCuenta();
      }else{
          this.router.navigate(['/modulo-login/login']);
      }
  }

clickDetalle(cuenta: Cuenta){
    const params = {
        titulo: AppConstants.Modal.TITLE_MODAL_DETALLE_CUENTA,
        operation: AppConstants.Modal.OP_DETAIL,
        options: cuenta
    };
    this.commonsService.openModalLarge(
    ModalDetailCuentaComponent,
    params)
    .subscribe((response) => {
        if(response){
        this.commonsService.openModalExitoOperation();
        this.reqLstCuenta();
        }
    });
}

clickMovimiento(cuenta: Cuenta){
    this.commonsService.setParam(cuenta);
    this.router.navigate(['/modulo-movimientos/movimientos']);
}

reqLstCuenta(){
    this.lstCuenta = new Array();
    this.block = new Array();
  this.hideItem = false;
  this.cuentaService.getLstCuenta(this.usuario._id)
  .pipe(
    catchError(error => {
      console.log('error occured:', error);
      throw error;
    }),
    finalize(() => {
        this.hideItem = true;
    })
  ).subscribe((data) => {
      this.lstCuenta = data.body.body;
      for(let i in this.lstCuenta){
        this.lstCuenta[i].createdAt = AppUtils.convertDateToString(this.lstCuenta[i].createdAt);
        this.lstCuenta[i].updatedAt = AppUtils.convertDateToString(this.lstCuenta[i].updatedAt); 
        if(!this.lstCuenta[i].indActivo){this.block.push("alta")};
        if(this.lstCuenta[i].indActivo){this.block.push("baja")}; 
      }
    });
}
}
