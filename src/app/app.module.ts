import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { CommonsService } from './services/commons.service';
import { UsuarioService } from 'src/app/services/usuario.services';
import { MovimientoService } from 'src/app/services/movimiento.services';
import { CuentaService } from 'src/app/services/cuenta.services';

//modals
import { ModalDetailUsuarioComponent } from './modulo-usuario/usuario/detail/modal-detail-usuario.component';
import { ModalDetailCuentaComponent } from './layouts/main/detail/modal-detail-cuenta.component';
import { ModalDetailMovimientoComponent } from './modulo-movimiento/movimiento/detail/modal-detail-movimiento.component';

//layouts
import { HeaderComponent } from './layouts/header/header.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { BreadcumbComponent } from './layouts/breadcumb/breadcumb.component';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
//modulos
import { CommonsModule } from './layouts/commons.module';

@NgModule({
  declarations: [
    ModalDetailUsuarioComponent,
    ModalDetailCuentaComponent,
    ModalDetailMovimientoComponent,
    AppComponent,
    //HeaderComponent,
    //MenuComponent,
    //BreadcumbComponent,
    //FooterComponent,
    MainComponent
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
    CommonsModule,
    AppRoutingModule
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
    ModalDetailMovimientoComponent,
    HeaderComponent,
    MenuComponent,
    BreadcumbComponent,
    FooterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
