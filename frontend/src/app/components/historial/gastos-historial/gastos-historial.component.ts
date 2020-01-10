import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/gastos.service';

@Component({
  selector: 'app-gastos-historial',
  templateUrl: './gastos-historial.component.html',
  styleUrls: ['./gastos-historial.component.css']
})
export class GastosHistorialComponent implements OnInit {
  
    titulos : any [] = []; //titulos de la tabla
    public valores: any [] = []; //valores de la tabla

  constructor(private gastosService : GastosService) { }

  async ngOnInit() {
    let respuesta_gastos : any = await this.gastosService.getAllGastos();

    if(this.valores.length == 0) {
      for(let gasto of respuesta_gastos.data){
        let entries = Object.entries(gasto);

        if(entries[6][1] == 0) {
          gasto.Pagado = 'No'          
        } else if (entries[6][1] == 1) {
          gasto.Pagado = 'Sí'
        }        
        
        this.valores.push(Object.values(gasto)); 
        }          
    }
    this.titulos = Object.keys(respuesta_gastos.data[0]);    
  }

}

