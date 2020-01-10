import { Component, OnInit } from '@angular/core';
import { GastosService } from 'src/app/services/gastos.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})
export class GastoComponent implements OnInit {

  gastos : any [] = [];
  form : FormGroup;
  moneda : any [] = [];
  categoria : any [] = [];

  constructor(private gastosService : GastosService, private router: Router) { }

  ngOnInit() {

    this.getMoneda();

    this.getCategoriaGastos();

    this.form = new FormGroup({
      'monto' : new FormControl('', [Validators.required]),
      //cada input, y le ponemos si arranca vacio y si tiene validadores, se pueden enviar muchos validators pero si o si dentro del array. Matchea con el formControlName del input
      'moneda' : new FormControl('', [Validators.required]),
      'detalle' : new FormControl('', [Validators.required]),
      'vencimiento' : new FormControl('', [Validators.required]),
      'banco' : new FormControl('', [Validators.required]),
      'categoria' : new FormControl('', [Validators.required]),
      'pagado' : new FormControl('', [Validators.required]),
      'fecha' : new FormControl('', [Validators.required])
    })
  }


  async getMoneda(){
    try {
    let moneda : any = await this.gastosService.getMoneda();
    this.moneda = moneda.data;
    } catch(error){
      console.log(error);
     }
  }

  async getCategoriaGastos(){
    try {
    let categoriaGastos : any = await this.gastosService.getCategoriaGastos();
    this.categoria = categoriaGastos.data;
  } catch(error){
    console.log(error);
  }
  }

  elegirMoneda(id) {
    this.form.value.moneda = id;
  }

  elegirCategoriaGastos(id) {
    this.form.value.categoria = id;
  }

  pagado(id){
    this.form.value.pagado = id;
  }
  

  async nuevoGasto(){
    
    let nuevo_gasto : any = await this.gastosService.nuevoGasto(this.form.value);
    
    if(nuevo_gasto != null){
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Nuevo gasto agregado',
        showConfirmButton: false,
        timer: 1500
    });

    this.form.reset();
        //this.router.navigate(['Login])

      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error'
        });
      }
  }

  alHome() {
    this.router.navigate(['/home'])
  }

}
