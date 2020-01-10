import { Component, OnInit } from '@angular/core';
import { AhorrosService } from 'src/app/services/ahorros.service';

@Component({
  selector: 'app-ahorros-historial',
  templateUrl: './ahorros-historial.component.html',
  styleUrls: ['./ahorros-historial.component.css']
})
export class AhorrosHistorialComponent implements OnInit {
  
  titulos : any [] = []; //titulos de la tabla
  public valores: any [] = []; //valores de la tabla

  constructor(private ahorrosService : AhorrosService) { }

  async ngOnInit() {
    let respuesta_ahorros : any = await this.ahorrosService.getAhorrosDetalladosUsuario();

    if(this.valores.length == 0) {
      for(let ahorro of respuesta_ahorros.ahorros_detallados){
               
        this.valores.push(Object.values(ahorro)); 
        }          
    }
    this.titulos = Object.keys(respuesta_ahorros.ahorros_detallados[0]);   
  }

}
