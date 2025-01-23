import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

    this.cpf = formatted; // Atualiza o modelo com o CPF formatado
  }

//-----------------------------------------------------------------------------------------------------------

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
  
    // Atualiza o valor formatado no input
    this.telefone = input;
  }

  //--------------------------------------------------------------------------------------------------------

  validateEmail(): void {
    // Regex para validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalid = !emailRegex.test(this.email);
  }

  ngOnInit() {
  }

}
