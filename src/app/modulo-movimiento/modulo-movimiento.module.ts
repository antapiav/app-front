import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//modulo routing
import { BbvaModuloMovimientoRoutes } from './modulo-movimiento.router';
//component inerno
import { MovimientoComponent } from './movimiento/movimiento.component';
//modulos importados
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonsModule } from '../layouts/commons.module';

@NgModule({
    imports: [
        NgbModule,
        CommonsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BbvaModuloMovimientoRoutes
    ],
    providers: [
    ],
    declarations: [
        MovimientoComponent
    ]
  })
  export class ModuloMovimientoModule { }