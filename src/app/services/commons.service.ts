import { Injectable, EventEmitter, Renderer2 } from '@angular/core';
//import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2/src/sweetalert2.js';
import { Observable } from 'rxjs';

@Injectable()
export class CommonsService {

  private eventBreadcumb: EventEmitter<any> = new EventEmitter<any>();
  private bsModalRef: BsModalRef;
  private resQuestion: any;

  public param: any;

  constructor(
    private spinnerService: NgxSpinnerService,
    private modalService: BsModalService
    ) { }

    setParam(param){this.param = param;}
    getParam(){return this.param;}

    async openModalConfirmQuestion(mensaje){
      
      await Swal.fire({
        title: mensaje,
        text: "Esta seguro de realizar esta operación???",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        allowEscapeKey : false,
        allowOutsideClick: false
      }).then((result) => {
          this.resQuestion = result;
      })
      return this.resQuestion;
    }

    async openModalExitoOperationImprimir(mensaje){
      
        await Swal.fire({
          title: mensaje,
          text: "Desea imprimir venta???",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          allowEscapeKey : false,
          allowOutsideClick: false
        }).then((result) => {
            this.resQuestion = result;
        })
        return this.resQuestion;
      }

    openModalExitoOperation(){
      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa',
        showConfirmButton: false,
        timer: 3000
      })
    }

    openModalErrorOperation(mensaje){
      Swal.fire({
        title: 'Error!',
        text: mensaje,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        allowEscapeKey : false,
        allowOutsideClick: false
      });
    }

    openModalInfo(title, mensaje){
      Swal.fire({
        title: title,
        text: mensaje,
        icon: 'question',
        allowEscapeKey : false,
        allowOutsideClick: false
      });
    }

    openModalErrorServer(){
      Swal.fire({
        title: 'Error!',
        text: 'No se puede establecer comunicación con el servidor :(',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        allowEscapeKey : false,
        allowOutsideClick: false
      });
    }

    openModalLarge(content: any, params?: any): Observable<any> {
      const initialState = {
        titulo: params.titulo,
        operation: params.operation,
        options: params.options,
        hideRol: params.hideRol
      };
      this.bsModalRef = this.modalService.show(content, { 
        initialState,
        backdrop: 'static',
        keyboard : false,
        class: 'modal-lg'
      });
  
      return new Observable<any>(this.getParameterModal());
    }

    openModalSmall(content: any, params?: any): Observable<string> {
      const initialState = {
        titulo: params.titulo,
        operation: params.operation,
        options: params.options
      };
      this.bsModalRef = this.modalService.show(content, { 
        initialState,
        backdrop: 'static',
        keyboard : false,
        class: 'modal-sm'
      });
  
      return new Observable<string>(this.getParameterModal());
    }

    getParameterModal() {
      return (observer) => {
        const subscription = this.modalService.onHidden.subscribe((reason: any) => {
          observer.next(this.bsModalRef.content.response);
          observer.complete();
        });
  
        return {
          unsubscribe() {
            subscription.unsubscribe();
          }
        };
      }
  }
  
  openModalLoading(){
    this.spinnerService.show();
  }

  closeModalLoading(){
    this.spinnerService.hide();
  }

  setEventBreadcumb(breadcumb: any): void {
    this.eventBreadcumb.emit(breadcumb);
  }

  getEventBreadcumb(): EventEmitter<any> {
    return this.eventBreadcumb;
  }
}