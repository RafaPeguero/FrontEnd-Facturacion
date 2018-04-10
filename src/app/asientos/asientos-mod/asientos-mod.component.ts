import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AsientosServiceService } from './../asientos-service.service';
import { Asientos } from './../asientos.modal';
import { ClientesServiceService} from './../../services/service.index';
import { Clientes } from './../../clientes/clientes.model';





@Component({
  selector: 'app-asientos-mod',
  templateUrl: './asientos-mod.component.html',
  styles: []
})
export class AsientosModComponent implements OnInit {

  clientes: any[] = [];

  forma: FormGroup;

  constructor(public route: Router,
              public _AsientossService: AsientosServiceService,
              public _ClientesService: ClientesServiceService) { }

  resetForm(forma?: FormGroup) {
    if (forma != null) {
      forma.reset();
      this._AsientossService.selectedAsiento = {
        asientoId: null,
        descripcion: '',
        clienteId: null,
        cuenta: 0,
        tipoMovimiento: false,
        fechaAsiento: '',
        montoAsiento: 0,
        estado: false
      };
    }
  }


  ngOnInit() {
    this.forma = new FormGroup({
      asientoID: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      clientes: new FormControl(null, Validators.required),
      cuenta: new FormControl(null, Validators.required),
      tipoMovimiento: new FormControl(false),
      fechaAsiento: new FormControl(null, Validators.required),
      montoAsiento: new FormControl(null, Validators.required),
      estado: new FormControl(false)
    });
    this._ClientesService.GetClientes().then((resp: any) => {
      console.log(resp);
    });
    // console.log(this._ClientesService.GetClientes());
  }

  link() {
    this.route.navigate(['/asientos']);
    this._AsientossService.GetAsientos();
    this.resetForm(this.forma);
    this._AsientossService.controlID = false;
  }

  registrarAsiento( forma: FormGroup) {
    // console.log( forma.value.articuloID );
    // tslint:disable-next-line:triple-equals
    if (this._AsientossService.controlID === true) {
      console.log('Estoy en el post');
    try {
      this._AsientossService.postAsiento(forma.value)
        .subscribe(data => {
          swal('Asiento registrado', '', 'success');
          this.resetForm(forma);
        });

    } catch {
        swal('Error al registrar asiento', '', 'error');
      }

    } else {

      try {
      console.log('Estoy en el put');
      this._AsientossService.putAsiento(forma.value.asientoId, forma.value)
    .subscribe(data => {
      swal('Asiento actualizado', '', 'success');
      this.resetForm(forma);
      this._AsientossService.GetAsientos();
    });
      } catch {
        swal('Error al actualizar asiento', '', 'error');
      }
  }
  }
}
