import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Movimiento } from 'src/app/model/movimiento.model';
import { MovimientoService } from 'src/app/services/movimiento.services';
import { CommonsService } from 'src/app/services/commons.service';
import { catchError, finalize } from 'rxjs/operators';
import { AppUtils } from 'src/app/util/app.utils';
import { AppConstants } from 'src/app/util/app.constants';
import { Cuenta } from 'src/app/model/cuenta.model';
import { ModalDetailMovimientoComponent } from './detail/modal-detail-movimiento.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit {  

    public hideItem: boolean = false;
    public movimiento: Movimiento;
    public lstMovimiento: Array<Movimiento>;
    public cuentaTitle: string;
    public block: Array<string>;
    public id_cuenta: any = AppConstants.String.STRING_VACIO;

  constructor(
      private movimientoService: MovimientoService,
      private commonsService: CommonsService,
      private router: Router
    ) { 
        this.movimiento = new Movimiento();
        this.movimiento.cuenta = new Cuenta();
        this.lstMovimiento = new Array();
        this.block = new Array();
    }

  ngOnInit(): void {
    if(AppUtils.validSession())
    {
        const cuenta = this.commonsService.getParam();
    
        if(cuenta == null || cuenta && undefined){
            this.router.navigate([''])
        }else{
            this.id_cuenta = cuenta._id;
            this.reqLstMovimiento();
        }
    }else{
        this.router.navigate(['/modulo-login/login']);
    }
  }

  clickMovimiento(movimiento: Movimiento){
    const params = {
        titulo: AppConstants.Modal.TITLE_MODAL_DETALLE_MOVIMIENTO,
        operation: AppConstants.Modal.OP_DETAIL,
        options: movimiento
    };
    this.commonsService.openModalLarge(
    ModalDetailMovimientoComponent,
    params)
    .subscribe((response) => {
        if(response){
        this.commonsService.openModalExitoOperation();
        this.reqLstMovimiento();
        }
    });
  }

  reqLstMovimiento(){
    this.block = new Array();
    this.lstMovimiento = new Array();
    this.hideItem = false;
    this.movimientoService.getLstMovimiento(this.id_cuenta)
    .pipe(
      catchError(error => {
        console.log('error occured:', error);
        throw error;
      }),
      finalize(() => {
        this.hideItem = true;
      })
    ).subscribe((data) => {
        this.lstMovimiento = data.body.body;
        if(this.lstMovimiento.length > 0){
            this.cuentaTitle = this.lstMovimiento[0].cuenta.nombre+": "+this.lstMovimiento[0].cuenta.nroCuenta;
        }else{
            this.cuentaTitle = AppConstants.String.STRING_SIN_MOVIMIENTOS;
        }
        for(let i in this.lstMovimiento){
            this.lstMovimiento[i].fecha = AppUtils.convertDateToString(this.lstMovimiento[i].fecha);
            if(!this.lstMovimiento[i].indActivo){this.block.push("alta")};
            if(this.lstMovimiento[i].indActivo){this.block.push("baja")}; 
        }
      });
  }
}
