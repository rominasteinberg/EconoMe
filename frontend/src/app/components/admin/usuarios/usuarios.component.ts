import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  titulos : any [] = []; //titulos de la tabla
  public valores: any [] = []; //valores de la tabla
  form : FormGroup;
  id_usuario;

  constructor(private router : Router, private usuariosService : UsuariosService, private modalService: NgbModal) { }

  async ngOnInit() {

    let usuarios_ok : any = await this.usuariosService.getUsuarios();

    if(this.valores.length == 0) {
      for(let usuario of usuarios_ok.data){
               
        this.valores.push(Object.values(usuario)); 
        }          
    }
    this.titulos = Object.keys(usuarios_ok.data[0]); 
    
    this.form = new FormGroup({
      
      'role' : new FormControl('', [Validators.required])
    })
  }

  open(content, i) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});   

    this.id_usuario = this.valores[i][0]
    
  }

  elegirRol(id) {
    this.form.value.role = id;
    this.form.value.id_u = this.id_usuario;
  }

  async editarRol(modal){
    
    let rol_ok : any = await this.usuariosService.putRolUsuario(this.form.value);
    
    if(rol_ok != null){
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Rol editado',
        showConfirmButton: false,
        timer: 1500
    });

    this.form.reset();
    
    this.ngOnInit();

    modal.close();

    location.reload(); 
 

      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error'
        });
      }
  }
}
