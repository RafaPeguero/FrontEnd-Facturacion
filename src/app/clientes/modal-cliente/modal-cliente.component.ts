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
    }
  }

  ngOnInit() {
    this.forma = new FormGroup({
      clienteID: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      cedula: new FormControl(null, Validators.required),
      cuentaContable: new FormControl(null, Validators.required),
      estado: new FormControl(false)
    });
  }

  link() {
    this.route.navigate(['/clientes']);
    this._ClientesService.GetClientes();
  }

  registrarCliente( forma: FormGroup) {
    console.log(forma.value);
    console.log( forma.value.clienteID );
    // tslint:disable-next-line:triple-equals
    if (forma.value.clienteID == this._ClientesService.selectedCliente.clienteId) {
      this._ClientesService.putCliente(forma.value.clienteID, forma.value)
    .subscribe(data => {
      swal('Cliente actualizado', '', 'success');
      this.resetForm(forma);
      this._ClientesService.GetClientes();
      // tslint:disable:no-debugger

    });
    // tslint:disable-next-line:no-debugger
  } else {
    if (!this.forma.invalid) {
      this._ClientesService.postClientes(forma.value)
        .subscribe(data => {
          swal('Cliente registrado', '', 'success');
          this.resetForm(forma);
        });
      } else {
        swal('Error al registrar cliente', '', 'error');
      }
    }
  }



}
