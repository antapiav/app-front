import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//modulo routing
import { BbvaModuloLoginRoutes } from './modulo-login.router';
//component inerno
import { LoginComponent } from './login/login.component';
//modulos importados
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BbvaModuloLoginRoutes
    ],
    providers: [
    ],
    declarations: [
        LoginComponent
    ]
  })
  export class ModuloLoginModule { }