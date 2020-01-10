import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';//HttpClient es una clase dentro del gran paquete de HttpClientModule
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { throws } from 'assert';

@Injectable({
  providedIn: 'root'
}) //esto mete en todos los componentes los services

export class BaseService {

  url_server = environment.url_server;
  endpoint = '';
  //url_server es la raiz de la url del backend que esta vinculado con el enviroment

// 'private http : HttpClient' esto es igual a const http = new HttpClient();
  constructor(private http : HttpClient) { }

  getHttpOptions() {

    let httpHeadersOptions : any = {}
    
    try {
      if(localStorage.getItem('usuario')) {
        
        httpHeadersOptions = {
          headers : new HttpHeaders ({
            'content-type' : 'application/json',
            Authorization : localStorage.getItem('usuario')
          })
        };

      } else {
        httpHeadersOptions = {
          headers : new HttpHeaders ( {
            'content-type' : 'application/json'
          })
        }
      }

      return httpHeadersOptions;
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  setEndPoint(endpoint) {
    // defina el endpoint para hacer la peticion al REST
    this.endpoint = endpoint;
  }

  async get() {
    //este metodo trae la respuesta del server en formato json
    try {
      const options : any = this.getHttpOptions();
      
      return this.http.get(this.url_server + this.endpoint, options).toPromise();
      
    } catch(e) {
      throw e;
    }
  }

  async post(obj) {
    try {
      const options : any = this.getHttpOptions();
      return this.http.post(this.url_server + this.endpoint, obj, options).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async put(obj) {
    try {
      const options = this.getHttpOptions();
      return this.http.put(this.url_server + this.endpoint, obj, options).toPromise();
      
    } catch(error) {
      throw error;
    }
  }

}


