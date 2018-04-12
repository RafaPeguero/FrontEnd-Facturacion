import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AsientosServiceService } from './../asientos-service.service';
import { Asientos } from './../asientos.modal';
import { ClientesServiceService} from './../../services/service.index';
import { Clientes } from './../../clientes/clientes.model';


/**
 * @title Basic DateTime Picker
 */


@Component({
  selector: 'app-asientos-mod',
  templateUrl: './asientos-mod.component.html',
  styles: []
})
export class AsientosModComponent implements OnInit {


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
      asientoID: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      descripcion: new FormControl(null, Validators.required),
      clienteId: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      cuenta: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      tipoMovimiento: new FormControl(false),
      fechaAsiento: new FormControl(null, Validators.required),
      montoAsiento: new FormControl(null, [Validators.required, Validators.minLength(0)]),
      estado: new FormControl(false)
    });
    console.log(this._AsientossService.controlID);
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
    console.log(forma);
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
      this._AsientossService.putAsiento(forma.value.asientoID, forma.value)
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
