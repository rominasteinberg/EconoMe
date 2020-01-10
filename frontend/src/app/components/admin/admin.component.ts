import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router : Router, private usuariosService : UsuariosService) { }

  usuarios: boolean = false;
  categorias: boolean = false;

  async ngOnInit() {

    try {
      let respuesta_server : any = await this.usuariosService.getUsuarios();
      
    } catch (error) {

      if(error.status == 401) {
        
        await Swal.fire({
            icon: 'error',
            title: 'Acceso Restringido',
            text: 'Acceso solo para administradorxs',
            showConfirmButton: false,
            timer: 1500
        })
      };

      await this.router.navigate(['/home']);    
    }

  }

  showUsuarios () {
    this.categorias = false;
    this.usuarios = !this.usuarios;
  }

  showCategorias() {
    this.usuarios = false;
    this.categorias = !this.categorias;
  }

}
