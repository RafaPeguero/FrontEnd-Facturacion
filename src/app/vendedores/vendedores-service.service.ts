import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { URL_SERVICIOS_ARTICULOS } from './../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Vendedores } from './vendedores.modal';
import { Clientes } from '../clientes/clientes.model';


@Injectable()
export class VendedoresServiceService {
  controlID: boolean = false;
  selectedVendedores: Vendedores = {
    vendedorId: 0,
    nombre: '',
    comision: 0.0,
    estado: false
  };
  vendedores: Vendedores;
  listaDeVendedores: Vendedores[];

  constructor(public http: Http,
    public router: Router) { }

    GetVendedores() {
      this.http.get('http://localhost:5000/api/Vendedores')
     .map((data: Response) => {
       return data.json() as Vendedores[];
     }).toPromise().then(x => {
       this.listaDeVendedores = x;
     });
   }

   postVendedor(ven: Vendedores) {
     let body = JSON.stringify(ven);
     let headerOptions = new Headers({'Content-Type': 'application/json'});
     let requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
     return this.http.post('http://localhost:5000/api/Vendedores', body, requestOptions).map(x => {
       x.json();
     });
   }

   deleteVendedor(id: number) {
     return this.http.delete('http://localhost:5000/api/Vendedores/' + id).map(res => res.json());

   }
   putVendedor(id, art) {
     let body = JSON.stringify(art);
     let headerOptions = new Headers({ 'Content-Type': 'application/json' });
     let requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
     return this.http.put('http://localhost:5000/api/Vendedores/' + id,
       body,
       requestOptions).map(res => res.json());
   }

}
