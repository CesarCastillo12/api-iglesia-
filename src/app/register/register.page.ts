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
  correoInput: string = '';
  passwordInput: string = '';

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  async registro() {
    if (!this.nombreInput || !this.correoInput || !this.passwordInput) {
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
      correo: this.correoInput,
      contraseña: this.passwordInput,
    };

    this.http.post('http://localhost:3000/registro', formData)
      .subscribe(response => {
        console.log('Usuario registrado con éxito:', response);

        // Muestra un mensaje de éxito
        this.mostrarMensajeExito();

        // Puedes redirigir al usuario a otra página aquí si lo deseas
      }, error => {
        console.error('Error al registrar usuario:', error);
      });
  }

  async mostrarMensajeExito() {
    const toast = await this.toastController.create({
      message: 'Usuario registrado con éxito.',
      duration: 2000,
      position: 'top',
      color: 'success', // Puedes cambiar el color a 'success' para un mensaje de éxito
    });
    toast.present();
  }
}
