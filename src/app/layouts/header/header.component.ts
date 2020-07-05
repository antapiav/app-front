import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AppUtils } from 'src/app/util/app.utils';
import { Usuario } from 'src/app/model/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public today: Observable<number>;
  public usuario: Usuario;

  constructor(
    private router: Router
  ) {
    this.today = timer(0, 1000).pipe(
      take(Date.now()),
      map(() => Date.now())
    );
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
      (AppUtils.validSession()) ? this.usuario.email = AppUtils.getSessionStorage().email : this.usuario = new Usuario();
  }

  logout() {
      AppUtils.logOutSession();
      this.router.navigate(['/modulo-login/login']);
  }

}
