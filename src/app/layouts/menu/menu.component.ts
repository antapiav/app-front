import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/model/menu';
import { AppUtils } from 'src/app/util/app.utils';
import { Usuario } from 'src/app/model/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    public usuario: Usuario;
    public collapsed: boolean = true;
    public listMenu: Array<Menu>;

  public listMenuUsurios: any;
  public listMenuMovimiento: any;

  constructor() {

    this.listMenuMovimiento = [
      new Menu(1, 'Operaciones', 'fa-clipboard', '/modulo-movimientos/movimientos', null)
    ];

    this.listMenuUsurios = [
      new Menu(1, 'Operaciones', 'fa-truck', '/modulo-usuario/usuario', null)
    ];
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    if(AppUtils.validSession())
    {
        this.usuario = new Usuario();
        this.usuario = AppUtils.getSessionStorage();
        if(this.usuario.rol == "1"){
            this.listMenu = [
                new Menu(1, ' Movimientos', 'fa-table', null, this.listMenuMovimiento),
                new Menu(2, ' Usuarios', 'fa-table', null, this.listMenuUsurios)
              ];
        }else{
            this.listMenu = [
                new Menu(1, ' Movimientos', 'fa-table', null, this.listMenuMovimiento)
              ];
        }
    }
  }

}
