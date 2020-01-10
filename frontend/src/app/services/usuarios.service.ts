import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseService{

  async getUsuario() {
    try {
      this.setEndPoint('/usuarios');
      return this.get();
    } catch (error) {
      console.log(error);
    }
  }

  async getUsuarios() { //PARA QUE EL ADMIN VEA TODOS LOS USUARIOS
    try {
      this.setEndPoint('/panelUsuarios');

      return this.get();
      
    } catch (error) {
      console.log(error);
    }
  }

  async postUsuario(obj) {
    try {
      this.setEndPoint('/registro');
      return this.post(obj);

    } catch (error) {
      console.log(error);
    }
  }
  
  async validarUsuario() {
    try {
      this.setEndPoint('/registro/:codigo_email_u');
      return this.get();

    } catch (error) {
      console.log(error);
    }
  }

  async loginUsuario(obj) {
    try {
      this.setEndPoint('/auth/login');
      
      return this.post(obj);

    } catch (error) {
      console.log(error);
    }
  }

  async putUsuario(obj) {
    this.setEndPoint('/usuarios');
    return this.put(obj);
  }

  async putRolUsuario(obj) {
    this.setEndPoint('/panelUsuarios');
    return this.put(obj);
  }
}

