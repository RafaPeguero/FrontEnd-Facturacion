import { Component, OnInit } from '@angular/core';
import {Clientes} from './../clientes.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Usuario } from '../../models/usuario.model';
import { ClientesServiceService } from './../clientes-service.service';

declare function init_plugins();
declare var sweetAlert: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {
  cargando: boolean = true;

  constructor( public _ClientesService: ClientesServiceService,
                public route: Router) { }

  ngOnInit() {
    init_plugins();
    this.mostrar();
  }

  link() {
    this.route.navigate(['/crearCliente']);
    this._ClientesService.controlID = true;
  }
  mostrar() {
    this._ClientesService.GetClientes();
    this.cargando = false;
  }

  BorrarCliente(id: number) {
    sweetAlert({
      title: 'Está seguro?',
      text: 'Está a punto de borar un Cliente',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._ClientesService.deleteCliente(id)
        .subscribe(x => {
          this._ClientesService.GetClientes();
          this.cargando = false;
        });
        }
      });

    }

    showForEdit(cli: Clientes) {
      this._ClientesService.selectedCliente = Object.assign({}, cli);
      console.log(this._ClientesService.selectedCliente);
      this.route.navigate(['/crearCliente']);
      this._ClientesService.controlID = false;
    }

}
