import { Injectable } from '@angular/core';
import { Asientos, asientosToContabilidad } from './asientos.modal';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { URL_SERVICIOS_ARTICULOS } from './../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { AsientoContableComponent } from './asiento-contable/asiento-contable.component';
import { OwlDateTime } from 'ng-pick-datetime/date-time/date-time.class';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Injectable()
export class AsientosServiceService {
  controlID: boolean = false;
  selectedAsiento: Asientos = {
    asientoId: 0,
    descripcion: '',
    clienteId: 0,
    clientes: 0,
    cuenta: 0,
    tipoMovimiento: false,
    fechaAsiento: '',
    montoAsiento: 0,
    estado: false,
  };
  asientos: Asientos;
  listaDeAsientos: Asientos[];
  listaDeAsientosToContabilidad: asientosToContabilidad[];

  selectedAsientoToContabilidad: asientosToContabilidad = {
    AuxiliarId: 3,
    AsientoContableDescripcion: '',
    AsientoContableCuentaCredito: 0,
    AsientoContableCuentaDebito: 0,
    AsientoContableMonto: 0.0
  };

  constructor(public http: Http,
    public router: Router) { }

    GetAsientos() {
      this.http.get('http://localhost:5000/api/Asiento')
     .map((data: Response) => {
       return data.json() as Asientos[];
     }).toPromise().then(x => {
       this.listaDeAsientos = x;
     });
   }

   postAsiento(ast: Asientos) {
     let body = JSON.stringify(ast);
     let headerOptions = new Headers({'Content-Type': 'application/json'});
     let requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
     return this.http.post('http://localhost:5000/api/Asiento', body, requestOptions).map(x => {
       x.json();
     });
   }

   deleteAsiento(id: number) {
     return this.http.delete('http://localhost:5000/api/Asiento/' + id).map(res => res.json());

   }
   putAsiento(id, ast) {
     let body = JSON.stringify(ast);
     let headerOptions = new Headers({ 'Content-Type': 'application/json' });
     let requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
     return this.http.put('http://localhost:5000/api/Asiento/' + id,
       body,
       requestOptions).map(res => res.json());
   }

   GetAsientosToContabilidad() {
    this.http.get('http://localhost:5000/api/Asiento')
   .map((data: Response) => {
     return data.json() as asientosToContabilidad[];
   }).toPromise().then(x => {
     this.listaDeAsientosToContabilidad = x;
   });
 }

   postAsientoToContabilidad(ast: asientosToContabilidad) {
    let body = JSON.stringify(ast);
    let headerOptions = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    let requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
    return this.http.post('http://contabilidadpropietaria.azurewebsites.net/api/asientocontable/external', body, requestOptions).map(x => {
      x.json();
    });
  }

 }


