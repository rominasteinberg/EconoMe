import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  form : FormGroup;

  constructor(private usuariosService : UsuariosService, private router : Router) { }

  async ngOnInit() {

  let get_usuario : any = await this.usuariosService.getUsuario();

  let usuario = get_usuario.data[0];
  

    this.form = await new FormGroup({
      'nombre' : new FormControl(usuario.nombre_u , [Validators.required, Validators.minLength(5)]),
      //cada input, y le ponemos si arranca vacio y si tiene validadores, se pueden enviar muchos validators pero si o si dentro del array. Matchea con el formControlName del input
      'apellido' : new FormControl(usuario.apellido_u, [Validators.required, Validators.minLength(5)]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(4)])
    })

    console.log(this.form);
    
  }

  async modificar() {

    let put_ok : any = await this.usuariosService.putUsuario(this.form.value);

    if(put_ok.status == 'ok') {
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos actualizados',
        showConfirmButton: false,
        timer: 1500
      });

      this.form.reset();
      this.router.navigate(['home'])

    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error'
      })
    }
  }
}