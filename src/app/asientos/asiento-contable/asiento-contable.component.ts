import { Component, OnInit } from '@angular/core';
import { AsientosServiceService } from './../asientos-service.service';
import { Asientos } from './../asientos.modal';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Usuario } from '../../models/usuario.model';
import { FormGroup } from '@angular/forms';
declare function init_plugins();
declare var sweetAlert: any;

@Component({
  selector: 'app-asiento-contable',
  templateUrl: './asiento-contable.component.html',
  styles: []
})
export class AsientoContableComponent implements OnInit {

  asientos: Asientos[];
  cargando: boolean = true;
  constructor( public _AsientossService: AsientosServiceService,
                public route: Router) { }

  ngOnInit() {
    init_plugins();
    this.mostrar();
  }

  link() {
    this.route.navigate(['/crearAsiento']);
    this._AsientossService.controlID = true;
  }

  mostrar() {
    this._AsientossService.GetAsientos();
    this.cargando = false;
  }

  BorrarAsiento(id: number) {
    sweetAlert({
      title: 'Está seguro?',
      text: 'Está a punto de borar un asiento',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._AsientossService.deleteAsiento(id)
        .subscribe(x => {
          this._AsientossService.GetAsientos();
          this.cargando = false;
        });
        }
      });

    }

    showForEdit(ast: Asientos) {
      this._AsientossService.selectedAsiento = Object.assign({}, ast);
      this.route.navigate(['/crearAsiento']);
      this._AsientossService.controlID = false;
    }

    Publicar( ast: Asientos) {
      this._AsientossService.selectedAsiento = Object.assign({}, ast);
      try {
        this._AsientossService.postAsiento(this._AsientossService.selectedAsiento)
        .subscribe(data => {
          swal('Asiento enviado correctamente', '', 'success');
      });
    } catch {
      swal('Error al publicar asiento', '', 'error');
    }

  }
}
