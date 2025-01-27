import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})

export class CadastroPage implements OnInit {

  cpf: string = '';

  telefone: string = '';

  email: string = '';

  emailInvalid: boolean = false;

  pacienteForm: FormGroup;

  constructor(private fb:FormBuilder, private http:HttpClient) {

    this.pacienteForm = this.fb.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]], // Aceita CPF formatado
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
   
  }

  formatCPF(event: any) {
    const input = event.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    let formatted = '';

    if (input.length <= 3) {
      formatted = input;
    } else if (input.length <= 6) {
      formatted = `${input.slice(0, 3)}.${input.slice(3)}`;
    } else if (input.length <= 9) {
      formatted = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6)}`;
    } else {
      formatted = `${input.slice(0, 3)}.${input.slice(3, 6)}.${input.slice(6, 9)}-${input.slice(9, 11)}`;
    }

     // Atualiza o valor do campo no FormGroup
    this.pacienteForm.patchValue({ cpf: formatted });
  }

//---------------------------------------------------------------------------------------------------------//

  formatPhone(event: any): void {
    let input = event.target.value || '';
    
    // Remove tudo que não for número
    input = input.replace(/\D/g, '');
  
    // Adiciona máscara no formato (00) 00000-0000
    if (input.length > 10) {
      input = input.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (input.length > 6) {
      input = input.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
    } else if (input.length > 0) {
      input = input.replace(/^(\d*)/, '($1');
    }
  
    // Atualiza o valor do campo no FormGroup
    this.pacienteForm.patchValue({ telefone: input });
  }

  //---------------------------------------------------------------------------------------------------------//

  validateEmail(): void {
    // Regex para validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = this.pacienteForm.get('email')?.value || '';

    // Atualiza a variável de controle para validação visual
    this.emailInvalid = !emailRegex.test(email);
  }

  //---------------------------------------------------------------------------------------------------------//

  onSubmit() {
    if (this.pacienteForm.valid) {
      const formData = this.pacienteForm.value;

      // Remove máscara do CPF antes de enviar
      formData.cpf = formData.cpf.replace(/\D/g, '');

      console.log('CPF formatado:', this.pacienteForm.get('cpf')?.value);

      console.log('Dados enviados:', formData);//VAMOS VER

      this.http.post('http://localhost:8800/api/pacientes', formData).subscribe({
        next: (response: any) => {
          console.log('Resposta do servidor:', response);
          if (response && response.message === 'Paciente cadastrado com sucesso') {
            alert('Cadastro realizado com sucesso!');
            this.pacienteForm.reset();
          } else {
            alert('Cadastro realizado, mas sem confirmação do servidor.');
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar paciente:', error);
          alert('Erro ao cadastrar paciente.');
        },
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  //---------------------------------------------------------------------------------------------------------//

  ngOnInit() {
  }

}
