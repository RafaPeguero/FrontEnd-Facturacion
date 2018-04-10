import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Vendedores } from './../vendedores.modal';
import { VendedoresServiceService } from './../vendedores-service.service';


declare function init_plugins();
declare var sweetAlert: any;

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styles: []
})
export class VendedoresComponent implements OnInit {
  cargando: boolean = true;

  constructor( public route: Router,
                public _VendedoresService: VendedoresServiceService) { }

  ngOnInit() {
    init_plugins();
    this.mostrar();
  }
  link() {
    this.route.navigate(['/crearVendedor']);
    this._VendedoresService.controlID = true;
  }
  mostrar() {
    this._VendedoresService.GetVendedores();
    this.cargando = false;
  }

  BorrarVendedor(id: number) {
    sweetAlert({
      title: 'Está seguro?',
      text: 'Está a punto de borar un Vendedor',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._VendedoresService.deleteVendedor(id)
        .subscribe(x => {
          this._VendedoresService.GetVendedores();
          this.cargando = false;
        });
        }
      });

    }

    showForEdit(ven: Vendedores) {
      this._VendedoresService.selectedVendedores = Object.assign({}, ven);
      this.route.navigate(['/crearVendedor']);
      this._VendedoresService.controlID = false;
    }

}
