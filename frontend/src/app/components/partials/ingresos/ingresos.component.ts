import { Component, OnInit } from '@angular/core';
import { IngresosService } from 'src/app/services/ingresos.service';
import { Router } from '@angular/router';
import {ModalManager} from "ngb-modal"

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  ingresosMes : any [] = [];
  sumaPesos : any;
  sumaDolares : any;
  nombreComponente : string = "Ingresos";
  titulos : any [] = [];
  suma: any;
  mensaje: string;

  constructor(private ingresosService : IngresosService, private router : Router, private modalService : ModalManager) { }

  async ngOnInit() {
    //Aca cargamos los ingresos como peticion a nuestro backend    
    
    try {
      let respuesta_server : any = await this.ingresosService.getIngresosDelMes() //get base service
      //respuesta_server devuelve un array de objetos

      if(respuesta_server.status == 'ok' && respuesta_server.data.length > 0) {
        this.ingresosMes = respuesta_server.data;    
        
        this.suma = respuesta_server.suma;
  
        if(respuesta_server.suma[0]) {
          this.sumaPesos = respuesta_server.suma[0];
        }
  
        if(respuesta_server.suma[1]) {
          this.sumaDolares = respuesta_server.suma[1];
        }
  
        this.titulos = Object.keys(this.ingresosMes[0]);      
      } else {
        this.mensaje = "No hubo ingresos en el mes corriente."
      }   
    }
     catch (error) {
      this.router.navigate(['/login']);
    }
  }

  async getIngresosTotales () {
    let respuesta_server : any = await this.ingresosService.getIngresos();
    
    if(respuesta_server.status == 'ok') {
      this.ingresosMes = respuesta_server.data;
    }
  }

  agregarIngreso() {
    this.router.navigate(['/nuevo-ingreso']);
  }
}