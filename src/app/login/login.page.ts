import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombreUsuario: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.nombreUsuario || !this.password) {
      const toast = await this.toastController.create({
        message: 'Por favor, ingresa el nombre de usuario y la contraseña.',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
      return;
    }

    const formData = {
      nombreUsuario: this.nombreUsuario,
      contraseña: this.password,
    };

    this.http.post('https://api28.onrender.com/login', formData)
      .subscribe(
        response => {
          console.log('Inicio de sesión exitoso:', response);
          this.router.navigateByUrl('/home');
        },
        error => {
          this.errorMessage = 'Credenciales incorrectas o error en el servidor. Por favor, inténtalo nuevamente.';
          console.error('Error en inicio de sesión:', error);
        }
      );
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
