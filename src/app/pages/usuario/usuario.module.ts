import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioComponent } from "./usuario.component";
import { SharedModule } from "src/app/shared/shared.module";
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioResolver } from "./usuario.resolver";
const ROUTES: Routes = [
    {path: '', component: UsuarioComponent},
    {path: 'new', component: UsuarioFormComponent},
    {
        path: 'update/:id', 
        component: UsuarioFormComponent,
        resolve: { usuario: UsuarioResolver }
    }
]
@NgModule({
    declarations: [
        UsuarioComponent,
        UsuarioFormComponent
    ],
    imports: [SharedModule, RouterModule.forChild(ROUTES)],
    exports: [SharedModule, UsuarioComponent]
})

export class UsuarioModule{}