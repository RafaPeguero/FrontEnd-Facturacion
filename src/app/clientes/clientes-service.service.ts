import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Clientes } from './clientes.model';



@Injectable()
export class ClientesServiceService {
  controlID: boolean = false;
  selectedCliente: Clientes = {
    clienteId: 0,
    nombre: '',
    cedula: '',
    cuentaContable: 0,
    estado: false
  };
  clientes: Clientes;
  listaDeClientes: Clientes [];

  constructor(public http: Http,
    public router: Router) { }


    GetClientes() {
     return this.http.get('http://localhost:5000/api/Clientes')
     .map((data: Response) => {
        return data.json() as Clientes[];
     }).toPromise().then(x => {
     this.listaDeClientes = x;
     });
   }

   postClientes(cli: Clientes) {
     let body = JSON.stringify(cli);
     let headerOptions = new Headers({'Content-Type': 'application/json'});
     let requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
     return this.http.post('http://localhost:5000/api/Clientes', body, requestOptions).map(x => {
       x.json();
     });
   }

   deleteCliente(id: number) {
     return this.http.delete('http://localhost:5000/api/Clientes/' + id).map(res => res.json());

   }
   putCliente(id, cli) {
     let body = JSON.stringify(cli);
     let headerOptions = new Headers({ 'Content-Type': 'application/json' });
     let requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
     return this.http.put('http://localhost:5000/api/Clientes/' + id,
       body,
       requestOptions).map(res => res.json());
   }


}
