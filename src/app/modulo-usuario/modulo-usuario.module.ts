import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//modulo routing
import { BbvaModuloUsuarioRoutes } from './modulo-usuario.route';
//component inerno
import { UsuarioComponent } from './usuario/usuario.component';
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
        BbvaModuloUsuarioRoutes
    ],
    providers: [
    ],
    declarations: [
        UsuarioComponent
    ]
  })
  export class ModuloUsuarioModule { }