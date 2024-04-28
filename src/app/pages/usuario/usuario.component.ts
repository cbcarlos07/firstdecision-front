import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  usuarioLista: Usuario[] = []
  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.listar()
  }

  listar(){
    this.service
        .listar()
        .subscribe((response: Usuario[])=>{
          this.usuarioLista = response
        })
  }

}
