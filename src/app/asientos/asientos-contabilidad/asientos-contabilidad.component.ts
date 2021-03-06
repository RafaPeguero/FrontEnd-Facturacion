import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AsientosServiceService } from './../asientos-service.service';

@Component({
  selector: 'app-asientos-contabilidad',
  templateUrl: './asientos-contabilidad.component.html',
  styles: []
})
export class AsientosContabilidadComponent implements OnInit {
  forma: FormGroup;
  constructor(public route: Router,
    public _AsientossService: AsientosServiceService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      AuxiliarId: new FormControl(3, [Validators.required, Validators.minLength(0)]),
      AsientoContableDescripcion: new FormControl(null, Validators.required),
      AsientoContableCuentaDebito: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      AsientoContableCuentaCredito: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      AsientoContableMonto: new FormControl(null, [Validators.required, Validators.minLength(0)]),
    });
  }
  // resetForm(forma?: FormGroup) {
  //   if (forma != null) {
  //     forma.reset();
  //     this._AsientossService.selectedAsiento = {
  //       asientoId: null,
  //       descripcion: '',
  //       clienteId: null,
  //       cliente: null,
  //       cuenta: 0,
  //       tipoMovimiento: false,
  //       fechaAsiento: '',
  //       montoAsiento: 0,
  //       estado: false
  //     };
  //   }

  link() {
    this.route.navigate(['/asientos']);
    this._AsientossService.GetAsientos();
    this._AsientossService.controlID = false;
  }

  publicar( forma: FormGroup) {
    try {
      console.log('Estoy en el post de Asientos para contabilidad');
      console.log( JSON.stringify( forma.value));
      this._AsientossService.postAsientoToContabilidad(forma.value)
    .subscribe(data => {
      swal('Asiento publicado', '', 'success');
    });
      } catch {
        swal('Error al publicar asiento', '', 'error');
      }
  }

}
