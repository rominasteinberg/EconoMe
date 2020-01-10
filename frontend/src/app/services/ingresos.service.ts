import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class IngresosService extends BaseService{
  async getIngresos() {
    try {
      this.setEndPoint('/ingresos');

      return this.get();

    } catch (error) {
      console.log(error);
    }
  }

  async getIngresosDelMes() {
    try {
      this.setEndPoint('/ingresos/currentmonth');

      return this.get();

    } catch (error) {
      console.log(error);
    }
  }

  async getIngresosPorCat(categoria) {
    try {
      this.setEndPoint(`/ingresos/${categoria}`);

      return this.get();

    } catch (error) {
      console.log(error);
    }
  }

  async getCategorias() {
    try {
      this.setEndPoint('/ingresos/categorias');

      return this.get();

    } catch (error) {
      console.log(error);
    }
  }

  async postIngreso(obj) {
    try {
      this.setEndPoint('/ingresos');

      return this.post(obj);

    } catch (error) {
      console.log(error);
    }
  }

  async putIngresos(obj) {
    try {
      this.setEndPoint('/ingresos');

      return this.put(obj);

    } catch (error) {
      console.log(error);
    }
  }

  async getMoneda(){
    try {
      this.setEndPoint('/ingresos/monedas');
      return this.get();
    } catch(error){
      console.log(error);
    }
  }

}

