import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  nuevoAdmin = { nombre: '', nombreUsuario: '', password: '' };

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async agregarAdministrador() {
    if (!this.nuevoAdmin.nombre || !this.nuevoAdmin.nombreUsuario || !this.nuevoAdmin.password) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos.',
        duration: 2000,
        position: 'top',
        color: 'danger',
      });
      toast.present();
      return;
    }

    this.http.post('http://localhost:3000/agregar-administrador', this.nuevoAdmin)
      .subscribe(
        (response: any) => {
          console.log(response.message);
          this.mostrarMensajeExito();
        },
        (error) => {
          if (error.status === 409) {
            this.mostrarMensajeError('El nombre de usuario del administrador ya existe.');
          } else {
            this.mostrarMensajeError('Error al agregar administrador.');
          }
          console.error('Error al agregar administrador:', error);
        }
      );
  }

  async mostrarMensajeExito() {
    const toast = await this.toastController.create({
      message: 'Administrador agregado con éxito.',
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

  irAPaginaProductos() {
    this.router.navigate(['/productos']); // Reemplaza 'productos' con la ruta real
  }

  irAPaginaAdmin() {
    this.router.navigate(['/admin']); // Reemplaza 'admin' con la ruta real
  }
}
