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
      }
    }

    ngOnInit() {
      this.forma = new FormGroup({
        vendedorId: new FormControl(null, Validators.required),
        nombre: new FormControl(null, Validators.required),
        comision: new FormControl(null, Validators.required),
        estado: new FormControl(false)
      });
    }

    link() {
      this.route.navigate(['/vendedores']);
      this._VendedoresService.GetVendedores();
    }

    registrarVendedor( forma: FormGroup) {
      console.log(forma.value);
      console.log( forma.value.vendedorId );
      // tslint:disable-next-line:triple-equals

      if (forma.value.vendedorId = this._VendedoresService.selectedVendedores.vendedorId) {
        this._VendedoresService.putVendedor(forma.value.vendedorId, forma.value)
      .subscribe(data => {
        swal('Cliente actualizado', '', 'success');
        this.resetForm(forma);
        this._VendedoresService.GetVendedores();

      });

    } else {
        this._VendedoresService.postVendedor(forma.value)
          .subscribe(data => {
            swal('Vendedor registrado', '', 'success');
            this.resetForm(forma);
          });
      }
    }

}
