import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  todasLasImagenes: string[] = [
    '/img/hero/img1.svg',
    '/img/hero/img3.svg',
    '/img/hero/img4.svg',
    '/img/hero/img6.svg',
    '/img/hero/img7.svg',
    '/img/hero/img9.svg',
    '/img/hero/img10.svg',
  ];

  imagenesActuales: string[] = [];
  layoutActual: string = 'layout-a';

  private intervaloCambio!: ReturnType<typeof setInterval>;
  private indiceInicio = 0; // 🔹 controla la posición de inicio
  private indiceLayout = 0; // 🔹 controla el layout actual

  ngOnInit(): void {
    this.generarNuevoSet();

    // 🔁 Cambia imágenes + layout cada 1.8 segundos
    this.intervaloCambio = setInterval(() => {
      this.generarNuevoSet();
    }, 1800);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervaloCambio);
  }

  private generarNuevoSet(): void {
    // 🔹 Selecciona 4 imágenes en secuencia circular
    const fin = this.indiceInicio + 4;
    if (fin <= this.todasLasImagenes.length) {
      this.imagenesActuales = this.todasLasImagenes.slice(this.indiceInicio, fin);
    } else {
      // Cuando llega al final, combina final + inicio
      const parte1 = this.todasLasImagenes.slice(this.indiceInicio);
      const parte2 = this.todasLasImagenes.slice(0, fin - this.todasLasImagenes.length);
      this.imagenesActuales = [...parte1, ...parte2];
    }

    // 🔹 Avanza el índice circularmente
    this.indiceInicio = (this.indiceInicio + 1) % this.todasLasImagenes.length;

    // 🔹 Cambia el layout también en secuencia
    const layouts = ['layout-a', 'layout-b', 'layout-c', 'layout-d', 'layout-e'];
    this.layoutActual = layouts[this.indiceLayout];
    this.indiceLayout = (this.indiceLayout + 1) % layouts.length;
  }
}
