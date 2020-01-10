import { Component, OnInit } from '@angular/core';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.component.html',
  styleUrls: ['./ahorro.component.css']
})
export class AhorroComponent implements OnInit {

  ahorros : any [] = [];
  form : FormGroup;
  moneda : any [] = [];
  categoria : any [] = [];

  constructor(private ahorrosService : AhorrosService, private router: Router) { }

  ngOnInit() {

    this.getMoneda();

    this.form = new FormGroup({
      'monto' : new FormControl('', [Validators.required]),
      //cada input, y le ponemos si arranca vacio y si tiene validadores, se pueden enviar muchos validators pero si o si dentro del array. Matchea con el formControlName del input
      'cuentaProyecto' : new FormControl(),
      'moneda' : new FormControl('', [Validators.required]),
      'fecha' : new FormControl('', [Validators.required]),
    })
  }

  async getMoneda(){
    try {
    let moneda : any = await this.ahorrosService.getMoneda();
    this.moneda = moneda.data;
    } catch(error){
      console.log(error);
     }
  }

  elegirMoneda(id) {
    this.form.value.moneda = id;
  }

  async nuevoAhorro(){
    
    let nuevo_ahorro : any = await this.ahorrosService.insertarAhorro(this.form.value);
    
    if(nuevo_ahorro != null){
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Nuevo ahorro agregado',
        showConfirmButton: false,
        timer: 1500
    });

    this.form.reset();

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
