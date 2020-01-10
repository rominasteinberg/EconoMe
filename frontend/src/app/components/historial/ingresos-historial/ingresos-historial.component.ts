import { Component, OnInit } from '@angular/core';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { IngresosService } from 'src/app/services/ingresos.service';
import { GastosService } from 'src/app/services/gastos.service';

@Component({
  selector: 'app-ingresos-historial',
  templateUrl: './ingresos-historial.component.html',
  styleUrls: ['./ingresos-historial.component.css']
})
export class IngresosHistorialComponent{

  titulos : any [] = [];
  public valores: any [] = [];

  

  constructor(private ingresosService : IngresosService, private gastosService : GastosService, private ahorrosService : AhorrosService) { }

  async ngOnInit() {
    let respuesta_ingresos : any = await this.ingresosService.getIngresos();

    if(this.valores.length == 0) {
      for(let ingreso of respuesta_ingresos.data){
        this.valores.push(Object.values(ingreso)); 
        }          
    }

    this.titulos = Object.keys(respuesta_ingresos.data[0]);
    
  }

}
