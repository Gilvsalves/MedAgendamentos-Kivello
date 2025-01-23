import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage {
  isMobile = false;

  constructor(private alertController: AlertController, private router: Router) {
    this.checkScreenSize(); // Verifica o tamanho da tela ao carregar
  }

  @HostListener('window:resize', [])
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; // Considera "mobile" telas com largura <= 768px
  }

  // onButtonClick() {
  //   console.log('Botão clicado!');
  //   // Insira aqui a lógica do que você deseja que o botão faça.
  // }

  async onMobileClick(buttonText: string) {
    if (this.isMobile) {
      const alert = await this.alertController.create({
        header: 'Telefones',
        message: buttonText,
        buttons: ['OK'],
        cssClass: 'custom-alert', // Classe CSS personalizada
      });
      await alert.present(); // Exibe o ion-alert
    } else {
      console.log(`Botão clicado: ${buttonText}`);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
