import { Component, OnInit, Renderer2, HostListener, Output, EventEmitter, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppConstants } from 'src/app/util/app.constants';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { Usuario } from 'src/app/model/usuario.model';
import { CommonsService } from 'src/app/services/commons.service';
import { UsuarioService } from 'src/app/services/usuario.services';
import { AppUtils } from 'src/app/util/app.utils';
import { AppMessages } from 'src/app/util/app-messages';

@Component({
  selector: 'app-modal-detail-usuario',
  templateUrl: './modal-detail-usuario.component.html',
  styleUrls: ['./modal-detail-usuario.component.css']
})
export class ModalDetailUsuarioComponent implements OnInit {

    public usuarioForm: FormGroup;
    public hideStatus: boolean = false;
    public hideStatusReniec: boolean = false;
    public hidePassword: boolean = true;
    public operation: string;
    public options: any;
    public hideRol: boolean;
    public nameBtnOperation: string;
    public titulo: string;
    public usuario: Usuario;
    public response: boolean = false;
    public disableBtnRegistrar: boolean = false;
    public disable: boolean = false;
    public statusValidateDni = false;
    public statusValidateName = false;
    public statusValidateEmail = false;
    public statusValidatePassword = false;
    public statusValidateConfirmPassword= false;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private commonsService: CommonsService,
    private usuarioService: UsuarioService
  ) {
      this.usuario = new Usuario();
      this.usuario.rol = AppConstants.String.STRING_CERO;
  }

  ngOnInit() {
    this.formUsuario();
    setTimeout(() => {
        switch(this.operation){
            case AppConstants.Modal.OP_SAVE:
              this.hideStatus = false;
              this.disableBtnRegistrar = true;
              this.usuario.indActivo = true;
              this.hidePassword = false;
              this.nameBtnOperation = AppConstants.Modal.BTN_REGISTRAR;
              this.usuarioForm.controls['indActivo'].disable();
              break;
            case AppConstants.Modal.OP_UPDATE:
              this.getDetalleCliente(this.options._id);
              this.hideStatus = false;
              this.nameBtnOperation = AppConstants.Modal.BTN_ACTUALIZAR;
              break;
            case AppConstants.Modal.OP_DETAIL:
              this.getDetalleCliente(this.options._id);
              this.hideStatus = true;
              this.disable = true;
              this.disableBtnRegistrar = true;
              this.usuarioForm.disable();
              break;
            default:
              this.hideStatus = false
          }
    });
  }

  formUsuario(){
      this.usuarioForm = this.formBuilder.group({
        _id:[this.usuario._id],
        dni:[this.usuario.dni, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        name:[this.usuario.name, [Validators.required]],
        email:[this.usuario.email, [Validators.required, Validators.email]],
        rol:[this.usuario.rol],
        createdAt:[this.usuario.createdAt],
        updatedAt:[this.usuario.updatedAt],
        indActivo:[this.usuario.indActivo],
        password: [this.usuario.password, [Validators.required]],
        confirmPassword: [this.usuario.password, Validators.required],
      }, { validator: AppUtils.validPassword('password', 'confirmPassword') });
  }

  get f() { return this.usuarioForm.controls; }

  validInput(nameTxt){
    switch(nameTxt){
      case "dni":
        this.statusValidateDni = true;
        break;
      case "name":
        this.statusValidateName = true;
        break;
      case "email":
        this.statusValidateEmail = true;
        break;
    case "password":
        this.statusValidatePassword = true;
        break;
    case "confirmPassword":
        this.statusValidateConfirmPassword = true;
        break;
    }
  }

  getDetalleCliente(idUsuario){
    this.commonsService.openModalLoading();
    this.usuarioService.getUsuario(idUsuario)
      .pipe(
      catchError(error => {
        this.commonsService.openModalErrorServer();
        throw error;
      }),
      finalize(() => {this.commonsService.closeModalLoading()}))
      .subscribe((data) => {
        this.usuario = data.body.body;
        this.usuario.createdAt = AppUtils.convertDateToString(this.usuario.createdAt);
        this.usuario.updatedAt = AppUtils.convertDateToString(this.usuario.updatedAt);               
        this.formUsuario();
      });
  }

  getDataRenic(){
    this.commonsService.openModalLoading();
    this.usuarioService.getDataReniec(this.usuario.dni)
    .pipe(
      timeout(60000),
      catchError(error => {
        this.commonsService.openModalErrorServer();
        throw error;
      }),
      finalize(() => {this.commonsService.closeModalLoading()}))
      .subscribe((data) => {
        if(data.body.code!=0){
          this.usuario.dni = data.body.body.dni;
          this.usuario.name = data.body.body.nombre+" "+data.body.body.apPaterno+" "+data.body.body.apMaterno;
        }else{
          this.commonsService.openModalInfo(AppMessages.GENERIC_TITLE_SEGURO_MODAL, data.body.message);
        }
        this.formUsuario();
      });
  }

  btnOperacion(){
    if(!this.usuarioForm.invalid){
        this.commonsService.openModalLoading();
        this.usuarioService.postPutOperation(this.usuario, this.operation)
          .pipe(
          catchError(error => {
            this.commonsService.openModalErrorServer();
            throw error;
          }),
          finalize(() => {this.commonsService.closeModalLoading()}))
          .subscribe((data) => {
            if(data.body.body.dni!=null || data.body.body.dni!=undefined){
                this.response = true;
                this.bsModalRef.hide();
            }else{
                this.response = false;
                this.commonsService.openModalErrorOperation(AppMessages.GENERIC_MSG_ERROR_MODAL);
            }
          });
      }
  }
  
}