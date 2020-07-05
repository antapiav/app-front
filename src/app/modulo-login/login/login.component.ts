import { Component, OnInit, TemplateRef, ElementRef, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { UsuarioService } from 'src/app/services/usuario.services';
import { Login } from 'src/app/model/login.module';
import { catchError, finalize } from 'rxjs/operators';
import { Usuario } from 'src/app/model/usuario.model';
import { AppConstants } from 'src/app/util/app.constants';
import { AppMessages } from 'src/app/util/app-messages';
import { ModalDetailUsuarioComponent } from 'src/app/modulo-usuario/usuario/detail/modal-detail-usuario.component';
import { AppUtils } from 'src/app/util/app.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  

    public login: Login;
    public usuario: Usuario;
    public msgErrorSession: string;

  constructor(
    private router: Router,
    private commonsService: CommonsService,
    private usuarioService: UsuarioService
    ) { 
        this.login = new Login();
        this.usuario = new Usuario();
        this.msgErrorSession = AppConstants.String.STRING_VACIO;
    }

  ngOnInit(): void {
    if(AppUtils.validSession())
    {
        this.router.navigate(['']);
    }
  }

  getLogin(){
    this.usuario = new Usuario();
    this.commonsService.openModalLoading();
    this.usuarioService.postLogin(this.login)
      .pipe(
      catchError(error => {
        this.commonsService.openModalErrorServer();
        throw error;
      }),
      finalize(() => {this.commonsService.closeModalLoading()}))
      .subscribe((data) => {
        this.usuario = data.body.body;
        (this.usuario.email == this.login.user && this.login.user != undefined) ?
            (this.usuario.indActivo) ? 
                this.setSession(this.usuario) : 
                    this.commonsService.openModalInfo(AppMessages.GENERIC_TITLE_OHOH_MODAL, AppMessages.GENERIC_MSG_LOGIN_ACCESS_FALSE) :          
            this.msgErrorSession = AppMessages.GENERIC_MSG_LOGIN_INCORRECT;

      });
  }

  setSession(usuario: Usuario){
    AppUtils.setSessionStorage(usuario);
    this.router.navigate(['modulo-movimientos/movimientos']);
}

  btnRegistrar(){
    const params = {
        titulo: AppConstants.Modal.TITLE_MODAL_REGISTRAR_USUARIO,
        operation: AppConstants.Modal.OP_SAVE,
        hideRol: true
      };
      this.commonsService.openModalLarge(
        ModalDetailUsuarioComponent,
        params)
        .subscribe((response) => {
          if(response){
            this.commonsService.openModalExitoOperation();
          }
        });
  }
}
