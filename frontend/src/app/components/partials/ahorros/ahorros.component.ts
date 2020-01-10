import { Component, OnInit } from '@angular/core';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { Router } from '@angular/router';
import { ModalManager } from "ngb-modal";
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ahorros',
  templateUrl: './ahorros.component.html',
  styleUrls: ['./ahorros.component.css']
})
export class AhorrosComponent implements OnInit {

  ahorrosTotal : any;
  detalleAhorros : any [] = [];
  ahorrosDelMes : any [] = [];
  sumaMonto : any;
  sumaDolares : any;
  nombreComponente : string = "Ahorros";
  titulos : any [] = [];
  nombre : string = '';
  cPPesos : any [] = [];
  cPDolares : any [] = [];
  moneda : any [] = [];
  form : FormGroup;
  contar : number = 0;
  mensaje : string;
  idCPP : null;
  idCPD : null;
  mensaje2 : string;
  mensaje3 : string;



  constructor(private ahorrosService : AhorrosService, private router : Router, private modalService : ModalManager) { }

  async ngOnInit() {

    this.form = new FormGroup({
      'objetivo' : new FormControl('', [Validators.required]),
      'moneda' : new FormControl('', [Validators.required])
    })

    this.getMoneda();
    this.getIdCPP();
    this.getIdCPD();

    if(localStorage.getItem('usuario') != null) {
      this.nombre = localStorage.getItem('nombre');
    }

    let ahorros_delmes : any = await this.ahorrosService.getAhorrosMonth();
    console.log(ahorros_delmes);

    if(ahorros_delmes.ahorros_delmes.length > 0) {
      this.ahorrosDelMes = ahorros_delmes.ahorros_delmes;
      this.sumaMonto = ahorros_delmes.ahorros_delmes[0];
      this.sumaDolares = ahorros_delmes.ahorros_delmes[1];
    } else {
      this.mensaje = "No hubo ahorros en el mes corriente."
      console.log(this.mensaje)
      console.log(this.ahorrosDelMes)
    }

    // this.ahorrosTotal = ahorros_total.ahorros_total;

    let detalle_ahorros : any = await this.ahorrosService.getAhorrosDetalladosUsuario();

    let objetivos : any = await this.ahorrosService.getCuentaProyecto();

    let contar : any = await this.ahorrosService.contarCP();

    if(contar != null) {
      this.contar = contar.data[0].cuenta;
    }

    if(objetivos.data.length > 0) {
      this.cPPesos = objetivos.data[0];
      this.cPDolares = objetivos.data[1];
    }

    if(detalle_ahorros.ahorros_detallados.length > 0) {
      this.detalleAhorros = detalle_ahorros.ahorros_detallados;

      this.titulos = Object.keys(this.detalleAhorros[0]);
    }

  }

  async getIdCPP(){
    try {
    let idCPP : any = await this.ahorrosService.getIdCPP();
    this.idCPP = idCPP.data[0];
    } catch(error){
      console.log(error);
     }
  }

  async getIdCPD(){
    try {
    let idCPD : any = await this.ahorrosService.getIdCPD();
    this.idCPD = idCPD.data[1];
    } catch(error){
      console.log(error);
     }
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

    this.mensaje2 = "";

    if(this.form.value.moneda == 1 && this.idCPP != null){
      this.mensaje2 = "Ya tenés un objetivo en esa moneda.";
    }else if(this.form.value.moneda == 2 && this.idCPD != null){
      this.mensaje2 = "Ya tenés un objetivo en esa moneda.";
    }

  }

  async nuevaCuentaProyecto(){

    let nueva_cp : any = await this.ahorrosService.insertarCuentaProyecto(this.form.value);

    if(nueva_cp != null){
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cuenta proyecto creada',
        showConfirmButton: false,
        timer: 1500
    });

    this.form.reset();
    this.ngOnInit();

      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error'
        });
      }


  }

  agregarAhorro() {
    this.router.navigate(['/nuevo-ahorro']);
  }



}
