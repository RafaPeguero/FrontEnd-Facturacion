import { Component, OnInit } from '@angular/core';
import { FacturacionServiciosService } from './../facturacion-servicios.service';
import { Facturacion } from './../facturacion.modal';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Usuario } from '../../models/usuario.model';
declare function init_plugins();
declare var sweetAlert: any;


@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styles: []
})
export class FacturacionComponent implements OnInit {
  factura: Facturacion[];
  cargando: boolean = true;
  constructor(public route: Router,
              public _FacturacionService: FacturacionServiciosService) { }

              ngOnInit() {
                init_plugins();
                this.mostrar();
              }

              link() {
                this.route.navigate(['/crearFactura']);
                this._FacturacionService.controlID = true;
              }

              mostrar() {
                this._FacturacionService.GetFacturas();
                this.cargando = false;
              }

              BorrarFactura(id: number) {
                sweetAlert({
                  title: 'Está seguro?',
                  text: 'Está a punto de borar una factura',
                  icon: 'warning',
                  buttons: true,
                  dangerMode: true
                }).then( borrar => {
                  if (borrar) {
                    this._FacturacionService.deleteFactura(id)
                    .subscribe(x => {
                      this._FacturacionService.GetFacturas();
                      this.cargando = false;
                    });
                    }
                  });

                }

                showForEdit(fac: Facturacion) {
                  this._FacturacionService.selectedFactura = Object.assign({}, fac);
                  console.log(this._FacturacionService.selectedFactura);
                  this.route.navigate(['/crearArticulo']);
                  this._FacturacionService.controlID = false;
                }

}
