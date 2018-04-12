import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FacturacionServiciosService } from './../facturacion-servicios.service';
import { Facturacion } from './../facturacion.modal';

import { ClientesServiceService } from './../../clientes/clientes-service.service';
import { VendedoresServiceService } from './../../vendedores/vendedores-service.service';
import { DetallesServiceService } from './../../detalles/detalles-service.service';

@Component({
  selector: 'app-facturacion-modal',
  templateUrl: './facturacion-modal.component.html',
  styles: []
})
export class FacturacionModalComponent implements OnInit {
  forma: FormGroup;
  constructor(public route: Router,
    public _FacturacionService: FacturacionServiciosService,
    public _ClientesService: ClientesServiceService,
    public _VendedoressService: VendedoresServiceService,
    public _DetallesService: DetallesServiceService) { }

    link() {
      this.route.navigate(['/articulos']);
      this._FacturacionService.GetFacturas();
      // this.resetForm(this.forma);
      this._FacturacionService.controlID = false;
    }
    resetForm(forma?: FormGroup) {
      if (forma != null) {
        forma.reset();
        this._FacturacionService.selectedFactura = {
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
      }
    }

  ngOnInit() {
    this.forma = new FormGroup({
      facturaId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      vendedorId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      clienteId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      tipoPago: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      comentario: new FormControl(null, Validators.required),
      cantidad: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      precioUnitario: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      clientes: new FormControl(this._FacturacionService.selectedFactura.clientes, Validators.required),
      vendedores: new FormControl(this._FacturacionService.selectedFactura.vendedores, Validators.required),
      detallesFactura: new FormControl(this._FacturacionService.selectedFactura.detallesFactura, Validators.required),
    });
  }


  registrarFactura( forma: FormGroup) {
  }


}
