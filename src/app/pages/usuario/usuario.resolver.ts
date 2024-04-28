import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { UsuarioService } from "./usuario.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })


export class UsuarioResolver implements Resolve<any> {

    constructor(private usuarioService: UsuarioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Faça a lógica para carregar os dados aqui
        const {id} = route.params
        
        return this.usuarioService.buscar(id); // Supondo que getData() retorna um Observable com os dados

    }
}