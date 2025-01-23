import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  cpf: string = '';
  
  constructor(private router: Router) { }

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

  ngOnInit() {
  }

}
