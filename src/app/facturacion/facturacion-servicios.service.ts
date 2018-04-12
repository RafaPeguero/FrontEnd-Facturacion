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
import { Facturacion } from './facturacion.modal';

import { Clientes } from '../clientes/clientes.model';
import { Vendedores } from '../vendedores/vendedores.modal';
import { Detalles } from '../detalles/detalles.modal';

import { ClientesServiceService } from './../clientes/clientes-service.service';
import { VendedoresServiceService } from './../vendedores/vendedores-service.service';
import { DetallesServiceService } from './../detalles/detalles-service.service';

@Injectable()
export class FacturacionServiciosService {
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
    clientes: this._ClientesService.clientes,
    vendedores: this._VendedoressService.vendedores,
    detallesFactura: this._DetallesService.detalles
  };
  factura: Facturacion;
  listaDeFacturas: Facturacion[];
  constructor(
    public http: Http,
    public router: Router,
    public _ClientesService: ClientesServiceService,
    public _VendedoressService: VendedoresServiceService,
    public _DetallesService: DetallesServiceService
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
}
