import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  mensaje_error: string = '';

  constructor(private usuariosService : UsuariosService, private router : Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  async login() {
    try {
      
      let user_ok : any = await this.usuariosService.loginUsuario(this.form.value);     
  
      if(user_ok.status != 'invalid') {

        localStorage.setItem('usuario', user_ok.JWT);
        localStorage.setItem('nombre', user_ok.usuario_ok.nombre);
     
        this.form.reset();
  
        this.router.navigate(['/']);

      } else {            
        this.mensaje_error = 'Usuario o contraseña incorrecta';
      }

    } catch (error) {
      
      console.log(error);
    }
  }
}
