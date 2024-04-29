import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuarioModalComponent } from './usuario-modal/usuario-modal.component';
import { Mensagem } from 'src/app/shared/dto/mensagem.dto';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuarioLista: Usuario[] = []
  modalRef?: BsModalRef
  constructor(private service: UsuarioService,
              private modalService: BsModalService,
              private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.service
        .listar()
        .pipe(
          catchError((error) => {
            
            console.error('Ocorreu um erro ao carregar a lista de usuários:', error);
            this.toastr.error('Ocorreu um erro ao carregar a lista de usuários. Tentando em 5 segundos', 'Opa!');
            setTimeout(() => {
              this.listar()
            }, 5000);
            return of([] as Usuario[]);
          })
        ).
        subscribe((response: Usuario[])=>{
          this.usuarioLista = response
        })
  }

  abrirModalPergunta(usuario: Usuario){
    this.modalRef = this.modalService.show(UsuarioModalComponent)
    this.modalRef.content.usuario = usuario.nome
    this.modalRef.content.status = false
    this.modalRef
        .content
        .closeModal.subscribe((resp: boolean)=>{
          if( resp ){
            (this.modalRef as any).content.status = true
            this.remover(usuario.id)
          }
          
        })
  }

  remover(id: number = 0){
    this.service
        .remover(id)
        .subscribe((response: Mensagem)=>{
          (this.modalRef as any).hide();
          this.toastr.success(response.mensagem, 'Muito bem!');
          this.listar()
        })
  }

}
