import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidatorService } from '../../../core/validators/custom-validator.service';
import { UsuarioService } from '../usuario.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../usuario.model';
import { Mensagem } from 'src/app/shared/dto/mensagem.dto';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  formGroup?: FormGroup
  mostrarSenha: boolean = false
  mostrarConfirmaSenha: boolean = false
  id: number  = 0
  carregando: boolean = false
  title: string = 'Adicionar'
  constructor(
    private customValidator: CustomValidatorService,
    private service: UsuarioService,
    public location: Location,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      nome: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}),
      email: new FormControl(null, {validators: [Validators.required,this.customValidator.patternValidator]}),
      senha: new FormControl(null, {validators: [Validators.required,Validators.minLength(6), Validators.maxLength(20)]}),
      confirmacaoSenha: new FormControl(null, {validators: [Validators.required]}),
    })

    const confirmPasswordControl = this.formGroup.get('confirmacaoSenha');
    if (confirmPasswordControl) {
      confirmPasswordControl.valueChanges.subscribe(() => {
        if (confirmPasswordControl) { 
          this.customValidator.validatePasswordConfirmation(this.getSenha(),this.getConfirmacaoSenha());
        }
      });
    }

    this.setarValores()

  }

  setarValores(){
    this.activatedRouter.data
        .subscribe((value: any)=>{
            const usuario: Usuario = value.usuario
            if( usuario ){
              this.id = usuario.id || 0
              this.title = 'Atualizar'
              this.formGroup?.patchValue(usuario)
              this.getNome()?.markAsDirty()
              this.getEmail()?.markAsDirty()
            }
            
        })
    
  }

  getNome(){
    return this.formGroup?.get('nome')
  }
  getEmail(){
    return this.formGroup?.get('email')
  }
  getSenha() {
    return this.formGroup?.get('senha')
  }
  getConfirmacaoSenha(){
    return this.formGroup?.get('confirmacaoSenha')
  }

  

  validarNome(){
    let classe = '';
    if( this.getNome()?.dirty )
      classe = this.getNome()?.invalid ? 'text-danger' : 'text-success'
    return classe
  }
  validarEmail(){
    let classe = '';
    if( this.getEmail()?.dirty )
      classe = this.getEmail()?.invalid ? 'text-danger' : 'text-success'
    return classe
  }
  validarSenha(){
    let classe = '';
    if( this.getSenha()?.dirty )
      classe = this.getSenha()?.invalid ? 'text-danger' : 'text-success'
    return classe
  }
  validarConfirmacaoSenha(){
    let classe = '';
    if( this.getConfirmacaoSenha()?.dirty )
      classe = this.getConfirmacaoSenha()?.invalid ? 'text-danger' : 'text-success'
    return classe
  }

  salvar(senha = false){
    this.carregando = true
    if( this.id > 0 ){
      if( senha ) this.atualizarSenha()
      else this.atualizar() 
    }else{
      this.novo()
    }
  }

  atualizar(){
    this.service
        .atualizar(this.id, this.formGroup?.value)
        .subscribe((msg: Mensagem)=>{
          this.carregando = false
          this.toastr.success(msg.mensagem, 'Muito bem!');
          this.location.back()
        })
  }
  atualizarSenha(){
    this.service
        .atualizarSenha(this.id, this.formGroup?.value)
        .subscribe((msg: Mensagem)=>{
          this.carregando = false
          this.toastr.success(msg.mensagem, 'Muito bem!');
          this.location.back()
        })
  }

  novo(){
    this.service
        .salvar(this.formGroup?.value)
        .pipe(
          catchError((error) => {
            const msg = 'Tivemos um problema ao tentar realizar o registro. Tente novamente em alguns minutos'
            console.error(msg, error);

            this.toastr.error(error && error.error.mensagem ? error.error.mensagem : msg, 'Opa!');
            
            return of({} as Mensagem);
          })
        )
        .subscribe((msg: Mensagem)=>{          
          this.carregando = false
          if( Object.keys(msg).length > 0 ){
            this.toastr.success(msg.mensagem, 'Muito bem!');
            this.location.back()
          }
        })
  }

  validarBtnAlterar(){
    if(this.getNome()?.touched || this.getEmail()?.touched ){
      return this.getNome()?.invalid || this.getEmail()?.invalid
    }else{
      return true
    }    
  }

  validarBtnAlterarSenha(){
    if( this.getSenha()?.dirty || this.getConfirmacaoSenha()?.dirty ){
      return this.getSenha()?.invalid || this.getConfirmacaoSenha()?.invalid
    }else{
      return true
    }
  }

}
