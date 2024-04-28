import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario.model';
import { Observable } from 'rxjs';
import { Mensagem } from 'src/app/dto/mensagem.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  host = environment.host
  constructor(private http: HttpClient) { 
    this.host = `${this.host}/usuario`
  }
  
  listar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.host)
  }
  
  salvar(value: Usuario): Observable<Mensagem> {
    return this.http.post<Mensagem>(this.host, value)
  }

  atualizar(id: number, value: Usuario): Observable<Mensagem> {
    return this.http.put<Mensagem>(`${this.host}/${id}`, value)
  }

  atualizarSenha(id: number, value: Usuario):Observable<Mensagem> {
    return this.http.put<Mensagem>(`${this.host}/senha/${id}`, value)
  }
  
  buscar(id: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.host}/${id}`)
  }
}
