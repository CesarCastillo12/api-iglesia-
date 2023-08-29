import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombreInput: string = '';
  nombreUsuarioInput: string = '';
  passwordInput: string = '';

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  async registro() {
    if (!this.nombreInput || !this.nombreUsuarioInput || !this.passwordInput) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos.',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
      return;
    }

    const formData = {
      nombre: this.nombreInput,
      nombreUsuario: this.nombreUsuarioInput,
      contraseña: this.passwordInput,
    };

    this.http.post('https://api28.onrender.com/registro', formData)
      .subscribe(
        response => {
          console.log('Usuario registrado con éxito:', response);
          this.mostrarMensajeExito();
        },
        error => {
          if (error.status === 409) {
            this.mostrarMensajeError('El nombre de usuario o el nombre ya existen.');
          } else {
            this.mostrarMensajeError('Error al registrar usuario.');
          }
          console.error('Error al registrar usuario:', error);
        }
      );
  }

  async mostrarMensajeExito() {
    const toast = await this.toastController.create({
      message: 'Usuario registrado con éxito.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async mostrarMensajeError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }
}
