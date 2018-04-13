import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,  NgForm, FormsModule } from '@angular/forms';
import { FacturacionServiciosService } from './../facturacion-servicios.service';
import { Facturacion } from './../facturacion.modal';

import { ClientesServiceService } from './../../clientes/clientes-service.service';
import { VendedoresServiceService } from './../../vendedores/vendedores-service.service';
import { ArticulosServiceService } from '../../services/service.index';


@Component({
  selector: 'app-facturacion-modal',
  templateUrl: './facturacion-modal.component.html',
  styles: []
})
export class FacturacionModalComponent implements OnInit {
  forma: FormGroup;
  forma2: FormGroup;
  constructor(public route: Router,
    public _FacturacionService: FacturacionServiciosService,
    public _ClientesService: ClientesServiceService,
    public _VendedoressService: VendedoresServiceService,
    public _ArticulosService: ArticulosServiceService) { }


    link() {
      this.route.navigate(['/facturacion']);
      this._FacturacionService.GetFacturas();
      this.resetForm(this.forma);
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
          clientes: 0,
          vendedores: 0,
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
      clientes: new FormControl(null, Validators.required),
      vendedores: new FormControl(null, Validators.required)
    });

    this.forma2 = new FormGroup({
      detalleId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      articuloId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      facturaId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      articulo: new FormControl(null, Validators.required)
    });

    this._ClientesService.GetClientes();
    this._VendedoressService.GetVendedores();
    this._FacturacionService.GetDetalles();
    this._ArticulosService.GetArticulos();
  }


  registrarFactura( forma: FormGroup, forma2: FormGroup) {
    try {
      this._FacturacionService.postDetalles(forma2.value).subscribe( () => console.log('REGISTRADO'));
      this._FacturacionService.postFactura(forma.value).subscribe(
        data => {
          swal('Factura registrada', '', 'success');
          this.forma.reset();
          this.forma2.reset();
          this._FacturacionService.GetFacturas();
          this._FacturacionService.GetFacturas();
        }
      );
    } catch {
      swal('Error al crear factura', '', 'error');
    }
  }


}
