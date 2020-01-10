import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor() { }

  ingresos: boolean = false;
  gastos: boolean = false;
  ahorros: boolean = false;

  ngOnInit() {     
  }

  showIngresos () {
    this.gastos = false;
    this.ahorros = false;
    this.ingresos = !this.ingresos;
  }

  showGastos() {
    this.ingresos = false;
    this.ahorros = false;
    this.gastos = !this.gastos;
  }

  showAhorros() {
    this.ingresos = false;
    this.gastos = false;
    this.ahorros = !this.ahorros;
  }
}
