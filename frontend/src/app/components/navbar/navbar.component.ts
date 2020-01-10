import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login : boolean;
  nombre : string = '';
  admin : boolean;

  constructor(private router : Router, private usuariosService : UsuariosService) { }

  async ngOnInit() {
    if(localStorage.getItem('usuario') != null) {
      this.nombre = localStorage.getItem('nombre');
      this.login = true;
    } else {
      this.login = false;
    }
    
    try {
      let respuesta_server : any = await this.usuariosService.getUsuarios();
      
      this.admin = true;
    } catch (error) {
      this.admin = false;
    }

  }

  

  logout() {
    localStorage.clear();
    this.login = false;
    this.router.navigate(['/login']);
}
}
