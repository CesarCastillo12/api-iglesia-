import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  irAPaginaProductos() {
    this.router.navigate(['/productos']); // Reemplaza 'productos' con la ruta real
  }

  irAPaginaAdmin() {
    this.router.navigate(['/admin']); // Reemplaza 'admin' con la ruta real
  }
}
