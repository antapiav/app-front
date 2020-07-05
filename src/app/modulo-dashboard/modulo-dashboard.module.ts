import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//modulo routing
import { BbvaModuloDashboardRoutes } from './modulo-dashboard.router';
//component inerno
import { DashboardComponent } from './dashboard/dashboard.component';
//modulos importados
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { CommonsModule } from '../layouts/commons.module';

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonsModule,
        BbvaModuloDashboardRoutes
    ],
    providers: [
    ],
    declarations: [
        DashboardComponent
    ]
  })
  export class ModuloDashboardModule { }
/*import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//ngx
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';

//servicios dev
import { CommonsService } from './../services/commons.service';
import { UsuarioService } from 'src/app/services/usuario.services';
import { MovimientoService } from 'src/app/services/movimiento.services';
import { CuentaService } from 'src/app/services/cuenta.services';

//modals
import { ModalDetailUsuarioComponent } from './../modulo-usuario/usuario/detail/modal-detail-usuario.component';
import { ModalDetailCuentaComponent } from './../layouts/main/detail/modal-detail-cuenta.component';
import { ModalDetailMovimientoComponent } from './../modulo-movimiento/movimiento/detail/modal-detail-movimiento.component';

//layouts
import { HeaderComponent } from './../layouts/header/header.component';
import { MenuComponent } from './../layouts/menu/menu.component';
import { BreadcumbComponent } from './../layouts/breadcumb/breadcumb.component';
import { MainComponent } from './../layouts/main/main.component';
import { FooterComponent } from './../layouts/footer/footer.component';

@NgModule({
  declarations: [
    ModalDetailUsuarioComponent,
    ModalDetailCuentaComponent,
    ModalDetailMovimientoComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    BreadcumbComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  providers: [
    CommonsService,
    UsuarioService,
    MovimientoService,
    CuentaService,
    BsModalService
  ],
  entryComponents: [
    ModalDetailUsuarioComponent,
    ModalDetailCuentaComponent,
    ModalDetailMovimientoComponent
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }*/
