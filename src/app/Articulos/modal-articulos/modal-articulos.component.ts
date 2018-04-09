import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ArticulosServiceService } from '../articulos-service.service';
import { Articulos } from './../articulos.model';


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
    }
  }


  ngOnInit() {
    this.forma = new FormGroup({
      articuloID: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      costoUnitario: new FormControl(null, Validators.required),
      precioUnitario: new FormControl(null, Validators.required),
      estado: new FormControl(false)
    });

  }

  link() {
    this.route.navigate(['/articulos']);
    this._ArticulosService.GetArticulos();
  }

  registrarArticulo( forma: FormGroup) {
    // console.log( forma.value.articuloID );
    // tslint:disable-next-line:triple-equals
    if (forma.value.articuloID == this._ArticulosService.selectedArticulo.articuloId) {

      this._ArticulosService.putArticulo(forma.value.articuloID, forma.value)
    .subscribe(data => {
      swal('Articulo actualizado', '', 'success');
      this.resetForm(forma);
      this._ArticulosService.GetArticulos();
      // tslint:disable:no-debugger

    });
    // tslint:disable-next-line:no-debugger
  } else {
    if (!this.forma.invalid) {
      this._ArticulosService.postArticulo(forma.value)
        .subscribe(data => {
          swal('Articulo registrado', '', 'success');
          this.resetForm(forma);
        });
      } else {
        swal('Error al registrar articulo', '', 'error');
      }
    }
  }

}
