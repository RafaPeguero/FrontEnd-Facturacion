import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Clientes } from './../clientes.model';
import { ClientesServiceService } from './../clientes-service.service';


@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styles: []
})
export class ModalClienteComponent implements OnInit {
  forma: FormGroup;

  constructor(public route: Router,
              public _ClientesService: ClientesServiceService) { }

  resetForm(forma?: FormGroup) {
    if (forma != null) {
      forma.reset();
      this._ClientesService.selectedCliente = {
        clienteId: 0,
        nombre: '',
        cedula: '',
        cuentaContable: 0,
        estado: false
      };
    }
  }

  ngOnInit() {
    this.forma = new FormGroup({
      clienteID: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      nombre: new FormControl(null, Validators.required),
      cedula: new FormControl(null, Validators.required),
      cuentaContable: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      estado: new FormControl(false)
    });
  }

  link() {
    this.route.navigate(['/clientes']);
    this._ClientesService.GetClientes();
    this.resetForm(this.forma);
    this._ClientesService.controlID = false;
  }

  registrarCliente( forma: FormGroup) {

    try {
      if (this._ClientesService.controlID === true) {
        console.log('Estoy en el post');
        if (this.validarCedula(this.forma.value.cedula) === true) {
          console.log(this.forma.value);
          try {
            this._ClientesService.postClientes(forma.value)
              .subscribe(data => {
                swal('Cliente registrado', '', 'success');
                this.resetForm(forma);
              });
          } catch {
              swal('Error al registrar cliente', '', 'error');
            }
        } else {
          swal('Cedula invalida', 'porfavor digite una cedula valida', 'error');
        }

      } else {

        try {
        console.log('Estoy en el put');
        if (this.validarCedula(this.forma.value.cedula) === true) {
          this._ClientesService.putCliente(forma.value.clienteID, forma.value)
      .subscribe(data => {
        swal('Articulo actualizado', '', 'success');
        this.resetForm(forma);
        this._ClientesService.GetClientes();
      });
        } else {
          swal('Cedula invalida', 'porfavor digite una cedula valida', 'error');
        }
        } catch {
          swal('Error al actualizar cliente', '', 'error');
        }
    }
    } catch {
      swal('Ha ocurrido un error', '', 'error');
    }
  }

  validarCedula(cedula: string) {
    // return (group: FormGroup) => {
    // let cant = group.controls[cedula].value;
    // console.log(cedula);
    let calculo: number;
    let total: number = 0;

    let vCedula = cedula.replace(/-/g, '');
    let Veri = 0;

    let longCed = vCedula.trim().length;
    let verificador = Number(vCedula.substr(vCedula.length - 1, 1));
    let digito: number[] = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];

    if (longCed !== 11) {
      return false;
    }
    for (let i = 1; i <= 10; i++) {
      calculo = Number(vCedula.substr(i - 1, 1)) * digito[i - 1];

      if (calculo < 10) {
        total += calculo;
      } else {
        total += Number(calculo.toString().substr(0, 1)) + Number(calculo.toString().substr(1, 1));
      }
      Veri = 10 - total % 10;
    }
    if (Veri === 10 || Veri === verificador) {
      return true;
    } else {
      return false;
    }
    // };
  }




}
