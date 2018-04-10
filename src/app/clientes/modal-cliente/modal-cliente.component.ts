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
        cedula: 0,
        cuentaContable: 0,
        estado: false
      };
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
    this.resetForm(this.forma);
    this._ClientesService.controlID = false;
  }

  registrarCliente( forma: FormGroup) {
    if (this._ClientesService.controlID === true) {
      console.log('Estoy en el post');
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

      try {
      console.log('Estoy en el put');
      this._ClientesService.putCliente(forma.value.clienteID, forma.value)
    .subscribe(data => {
      swal('Articulo actualizado', '', 'success');
      this.resetForm(forma);
      this._ClientesService.GetClientes();
    });
      } catch {
        swal('Error al actualizar cliente', '', 'error');
      }
  }
  }



}
