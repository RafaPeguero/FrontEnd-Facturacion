import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  RequestMethod
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Facturacion } from './facturacion.modal';

import { ClientesServiceService } from './../clientes/clientes-service.service';
import { VendedoresServiceService } from './../vendedores/vendedores-service.service';

import { Detalles } from './../detalles/detalles.modal';
import { ArticulosServiceService } from './../Articulos/articulos-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class FacturacionServiciosService {


  factura: Facturacion;
  listaDeFacturas: Facturacion[];
  // DETALLES SERVICES DECLARABLES
  selectedDetalle: Detalles = {
    detalleId: 0,
    articuloId: 0,
    facturaId: 0,
    factura: this.factura ,
    articulo: ''
  };
  detalles: Detalles;
  listaDetalles: Detalles[];
  controlID: boolean = false;
  selectedFactura: Facturacion = {
    facturaId: 0,
    vendedorId: 0,
    clienteId: 0,
    tipoPago: '',
    fecha: new Date(),
    comentario: '',
    cantidad: 0,
    precioUnitario: 0.0,
    clientes: 0,
    vendedores: 0
  };


  constructor(
    public http: Http,
    public router: Router,
    public _ClientesService: ClientesServiceService,
    public _VendedoressService: VendedoresServiceService,
    public _ArticulosService: ArticulosServiceService
  ) {}

  GetFacturas() {
    this.http
      .get('http://localhost:5000/api/Facturacion')
      .map((data: Response) => {
        return data.json() as Facturacion[];
      })
      .toPromise()
      .then(x => {
        this.listaDeFacturas = x;
      });
  }

  postFactura(fac: Facturacion) {
    let body = JSON.stringify(fac);
    let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      headers: headerOptions
    });
    return this.http
      .post('http://localhost:5000/api/Facturacion', body, requestOptions)
      .map(x => {
        x.json();
      });
  }

  deleteFactura(id: number) {
    return this.http
      .delete('http://localhost:5000/api/Facturacion/' + id)
      .map(res => res.json());
  }
  putFactura(id, art) {
    let body = JSON.stringify(art);
    let headerOptions = new Headers({ 'Content-Type': 'application/json' });
    let requestOptions = new RequestOptions({
      method: RequestMethod.Put,
      headers: headerOptions
    });
    return this.http
      .put('http://localhost:5000/api/Facturacion/' + id, body, requestOptions)
      .map(res => res.json());
  }

  // ===================================================== DETALLES SERVICE=======================================
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
