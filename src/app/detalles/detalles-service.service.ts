import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  RequestMethod
} from '@angular/http';
import { URL_SERVICIOS_ARTICULOS } from './../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Detalles } from './detalles.modal';
import { ArticulosServiceService } from './../Articulos/articulos-service.service';
import { FacturacionServiciosService } from './../facturacion/facturacion-servicios.service';

import { Articulos } from './../Articulos/articulos.model';

@Injectable()
export class DetallesServiceService {
  controlID: boolean = false;
  selectedArticulo: Detalles = {
    detalleId: 0,
    facturaId: 0,
    factura: this._FacturasService.factura,
    articulo: this._ArticulosService.articulos
  };
  detalles: Detalles;
  listaDetalles: Detalles[];
  constructor(
    public http: Http,
    public router: Router,
    public _ArticulosService: ArticulosServiceService,
    public _FacturasService: FacturacionServiciosService
  ) {}
  GetDetalles() {
    this.http
      .get('http://localhost:5000/api/Detallesfacturas')
      .map((data: Response) => {
        return data.json() as Detalles[];
      })
      .toPromise()
      .then(x => {
        this.listaDetalles = x;
      });
  }

  postDetalles(det: Detalles) {
    let body = JSON.stringify(det);
    let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      headers: headerOptions
    });
    return this.http
      .post('http://localhost:5000/api/Detallesfacturas', body, requestOptions)
      .map(x => {
        x.json();
      });
  }

  deleteDetalles(id: number) {
    return this.http
      .delete('http://localhost:5000/api/Detallesfacturas/' + id)
      .map(res => res.json());
  }
  putDetalles(id, art) {
    let body = JSON.stringify(art);
    let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({
      method: RequestMethod.Put,
      headers: headerOptions
    });
    return this.http
      .put('http://localhost:5000/api/Detallesfacturas/' + id, body, requestOptions)
      .map(res => res.json());
  }
}
