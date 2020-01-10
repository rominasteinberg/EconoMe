import {Component, OnInit, Input} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent {
  closeResult: string;
  @Input() public componente: any;
  public nombreComponente : string;
  public ingresosMes; // NO SE UTILIZA YA QUE NO SE APLICAN LOS DATOS
  public valores: any [] = [];
  public categorias: any [] = [];
  mensaje: string;

  constructor(private modalService: NgbModal) {}

 ngOnInit() {
   //SE VUELCAN LOS DATOS QUE VIAJAN EN LA VARIABLE COMPONENTE(UN ARRAY).
    this.nombreComponente = this.componente[0];
    this.ingresosMes = this.componente[1];  // CONSULTAR POR QUE NO SE VUELCAN LOS DATOS EN LA VARIABLE   
  }
    
  //AL ABRIR EL MODAL
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

      //SI AUN NO SE VOLCARON LOS DATOS, RECORRE TODOS LOS DATOS QUE VIAJAN EN EL COMPONENTE (LOS INGRESOS DEL MES)
      // Y LOS RECORRE PUSHEANDOLOS A UN ARRAY DE VALORES.
      if(this.valores.length == 0) {
        for(let ingreso of this.componente[1]){
          this.valores.push(Object.values(ingreso)); 
          //OBJETC.VALUES(INGRESO) es una forma de transformar el objeto en un array de los values, sin las keys.
          }          
      }

    }    
  }