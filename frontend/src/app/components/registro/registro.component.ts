import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
form : FormGroup;

  constructor(private usuariosService : UsuariosService, private router : Router) { }

  ngOnInit() {
    //activar los controles
    this.form = new FormGroup({
      'nombre' : new FormControl('', [Validators.required, Validators.minLength(5)]),
      //cada input, y le ponemos si arranca vacio y si tiene validadores, se pueden enviar muchos validators pero si o si dentro del array. Matchea con el formControlName del input
      'apellido' : new FormControl('', [Validators.required, Validators.minLength(5)]),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  async registrar() {

    let post_ok : any = await this.usuariosService.postUsuario(this.form.value);

    if(post_ok.status == 'ok') {
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro exitoso!',
        showConfirmButton: false,
        timer: 1500
      });

      this.form.reset();
      //this.router.navigate(['Login])

    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
        footer: '<a href>Por qué?</a>'
      })
    }
  }
}