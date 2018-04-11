import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {Vendedores} from './../vendedores.modal';
import { VendedoresServiceService } from './../vendedores-service.service';


@Component({
  selector: 'app-modal-vendedores',
  templateUrl: './modal-vendedores.component.html',
  styles: []
})

export class ModalVendedoresComponent implements OnInit {
  forma: FormGroup;
  constructor( public route: Router,
    public _VendedoresService: VendedoresServiceService) { }

    resetForm(forma?: FormGroup) {
      if (forma != null) {
        forma.reset();
        this._VendedoresService.selectedVendedores = {
          vendedorId: 0,
          nombre: '',
          comision: 0,
          estado: false
        };
      }
    }

    ngOnInit() {
      this.forma = new FormGroup({
        vendedorId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
        nombre: new FormControl(null, Validators.required),
        comision: new FormControl(null, [Validators.required, Validators.minLength(0)]),
        estado: new FormControl(false)
      });
    }

    link() {
      this.route.navigate(['/vendedores']);
      this._VendedoresService.GetVendedores();
      this.resetForm(this.forma);
      this._VendedoresService.controlID = false;
    }

    registrarVendedor( forma: FormGroup) {
      if (this._VendedoresService.controlID === true) {
        console.log('Estoy en el post');
      try {
        this._VendedoresService.postVendedor(forma.value)
          .subscribe(data => {
            swal('Vendedor registrado', '', 'success');
            this.resetForm(forma);
          });
      } catch {
          swal('Error al registrar vendedor', '', 'error');
        }

      } else {

        try {
        console.log('Estoy en el put');
        this._VendedoresService.putVendedor(forma.value.vendedorId, forma.value)
      .subscribe(data => {
        swal('Vendedor actualizado', '', 'success');
        this.resetForm(forma);
        this._VendedoresService.GetVendedores();
      });
        } catch {
          swal('Error al actualizar vendedor', '', 'error');
        }
    }
    }

}
