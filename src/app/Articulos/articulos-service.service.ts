import { Injectable } from '@angular/core';
import { Articulos } from './articulos.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { URL_SERVICIOS_ARTICULOS } from './../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticulosServiceService {
  controlID: boolean = false;
  selectedArticulo: Articulos = {
    articuloId: 0,
    descripcion: '',
    costoUnitario: 0.0,
    precioUnitario: 0.0,
    estado: false
  };
  articulos: Articulos;
  listaDeArticulos: Articulos[];

  constructor(public http: Http,
    public router: Router) { }

    GetArticulos() {
     this.http.get('http://localhost:5000/api/Articulos')
    .map((data: Response) => {
      return data.json() as Articulos[];
    }).toPromise().then(x => {
      this.listaDeArticulos = x;
    });
  }

  postArticulo(art: Articulos) {
    let body = JSON.stringify(art);
    let headerOptions = new Headers({'Content-Type': 'application/json'});
    let requestOptions = new RequestOptions({method : RequestMethod.Post, headers : headerOptions});
    return this.http.post('http://localhost:5000/api/Articulos', body, requestOptions).map(x => {
      x.json();
    });
  }

  deleteArticulo(id: number) {
    return this.http.delete('http://localhost:5000/api/Articulos/' + id).map(res => res.json());

  }
  putArticulo(id, art) {
    let body = JSON.stringify(art);
    let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:5000/api/Articulos/' + id,
      body,
      requestOptions).map(res => res.json());
  }
}
