import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormComponent } from './usuario-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../usuario.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

describe('UsuarioFormComponent', () => {
  let component: UsuarioFormComponent;
  let fixture: ComponentFixture<UsuarioFormComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot() 
      ],
      providers: [
        UsuarioService, 
        ToastrService, 
        Location
      ] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFormComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    
    component.formGroup = new FormGroup({
      nome: new FormControl(),
      email: new FormControl(),
      senha: new FormControl(),
      confirmacaoSenha: new FormControl()
    });
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form fields', () => {
    const nomeInput = (component.formGroup as any).controls['nome'];
    nomeInput.setValue(''); 
    expect(nomeInput.valid).toBeFalsy(); // Deve ser inválido

    const emailInput = (component.formGroup as any).controls['email'];
    emailInput.setValue('invalidemail'); 
    expect(emailInput.valid).toBeFalsy(); // Deve ser inválido

    const senhaInput = (component.formGroup as any).controls['senha'];
    senhaInput.setValue('1'); 
    expect(senhaInput.valid).toBeFalsy(); // Deve ser inválido
    
    const confirmacaoSenhaInput = (component.formGroup as any).controls['confirmacaoSenha'];
    confirmacaoSenhaInput.setValue(null); 
    expect(confirmacaoSenhaInput.valid).toBeFalsy(); // Deve ser inválido

  });

  it('should enable or disable the submit button based on form validity', () => {
    
    const submitButton = fixture.nativeElement.querySelector('.btn-save');
    expect(submitButton.disabled).toBeTruthy();

    
    (component.formGroup as any).patchValue({
      nome: 'Nome válido',
      email: 'email@example.com',
      senha: 'password',
      confirmacaoSenha: 'password'
    });

    
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalsy();
  });
});
