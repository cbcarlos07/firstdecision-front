import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  patternValidator(control: FormControl): { [key: string]: any } | null {
    if (!control.value || control.value.trim() === '') {
      return null; // Retorna null se o valor for nulo ou vazio
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = regex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  validatePasswordConfirmation(senha: any, confirmacaoSenha: any): void {
    const passwordControl = senha;
    const confirmPasswordControl = confirmacaoSenha;

    if (!passwordControl || !confirmPasswordControl) {
      return;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ passwordNotMatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }

   
}
