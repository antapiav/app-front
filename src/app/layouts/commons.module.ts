import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BreadcumbComponent } from './breadcumb/breadcumb.component';
import { FooterComponent } from './footer/footer.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CollapseModule,
    BsDropdownModule,
    RouterModule,
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    BreadcumbComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    BreadcumbComponent,
    FooterComponent
  ]
})
export class CommonsModule { }