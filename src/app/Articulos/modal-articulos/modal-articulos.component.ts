import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ArticulosServiceService } from '../articulos-service.service';
import { Articulos } from './../articulos.model';
import { DISABLED } from '@angular/forms/src/model';


@Component({
  selector: 'app-modal-articulos',
  templateUrl: './modal-articulos.component.html',
})
export class ModalArticulosComponent implements OnInit {
  forma: FormGroup;

  constructor(public route: Router,
              public _ArticulosService: ArticulosServiceService) { }

  resetForm(forma?: FormGroup) {
    if (forma != null) {
      forma.reset();
      this._ArticulosService.selectedArticulo = {
        articuloId: null,
        descripcion: '',
        costoUnitario: 0,
        precioUnitario: 0,
        estado: false
    };
    }
  }


  ngOnInit() {
    this.forma = new FormGroup({
      articuloID: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      descripcion: new FormControl(null, Validators.required),
      costoUnitario: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      precioUnitario: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      estado: new FormControl(false)
    });
  }

  link() {
    this.route.navigate(['/articulos']);
    this._ArticulosService.GetArticulos();
    this.resetForm(this.forma);
    this._ArticulosService.controlID = false;
  }

  registrarArticulo( forma: FormGroup) {
    // tslint:disable-next-line:triple-equals
    if (this._ArticulosService.controlID === true) {
      console.log('Estoy en el post');
    try {
      this._ArticulosService.postArticulo(forma.value)
        .subscribe(data => {
          swal('Articulo registrado', '', 'success');
          this.resetForm(forma);
        });

    } catch {
        swal('Error al registrar articulo', '', 'error');
      }

    } else {

      try {
      console.log('Estoy en el put');
      this._ArticulosService.putArticulo(forma.value.articuloID, forma.value)
    .subscribe(data => {
      swal('Articulo actualizado', '', 'success');
      this.resetForm(forma);
      this._ArticulosService.GetArticulos();
    });
      } catch {
        swal('Error al actualizar articulo', '', 'error');
      }
  }

}
}
