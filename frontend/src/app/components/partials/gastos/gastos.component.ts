import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/gastos.service';
import { Router } from '@angular/router';
import {ModalManager} from "ngb-modal";

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})

export class GastosComponent implements OnInit {

  gastosMes : any [] = [];
  suma : any;
  sumaDolares : any;
  nombreComponente : string = "Gastos";
  titulos : any [] = [];
  nombre : string = '';
  mensaje : string;
 

  constructor(private gastosService : GastosService, private router : Router, private modalService : ModalManager) { }

  async ngOnInit() {
    if(localStorage.getItem('usuario') != null) {
      this.nombre = localStorage.getItem('nombre');
    }

    let gastos_mes_respuesta : any = await this.gastosService.getGastosMonth();

    if(gastos_mes_respuesta.data.length > 0) {
      this.gastosMes = gastos_mes_respuesta.data;
      this.suma = gastos_mes_respuesta.suma[0];
      this.sumaDolares = gastos_mes_respuesta.suma[1];

      this.titulos = Object.keys(this.gastosMes[0]); 
    } else {
      this.mensaje = "No hubo gastos en el mes corriente."
      console.log(this.mensaje)
      console.log(this.gastosMes);
    }   
}

async getSumaGastosMonth() {
  let respuesta_server : any = await this.gastosService.getGastos();
  
  if(respuesta_server.status == 'ok') {
    this.gastosMes = respuesta_server.data;
  }
}

agregarGasto() {
  this.router.navigate(['/nuevo-gasto']);
}
}



