import { Component, OnInit } from '@angular/core';
import { ArticulosServiceService } from './../articulos-service.service';
import { Articulos } from '../articulos.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Usuario } from '../../models/usuario.model';
declare function init_plugins();
declare var sweetAlert: any;

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styles: []
})
export class ArticulosComponent implements OnInit {
  articulos: Articulos[];
  cargando: boolean = true;
  constructor( public _ArticulosService: ArticulosServiceService,
                public route: Router) { }

  ngOnInit() {
    init_plugins();
    this.mostrar();
  }

  link() {
    this.route.navigate(['/crearArticulo']);
  }

  mostrar() {
    this._ArticulosService.GetArticulos();
    this.cargando = false;
  }

  BorrarArticulo(id: number) {
    sweetAlert({
      title: 'Está seguro?',
      text: 'Está a punto de borar un articulo',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._ArticulosService.deleteArticulo(id)
        .subscribe(x => {
          this._ArticulosService.GetArticulos();
          this.cargando = false;
        });
        }
      });

    }

    showForEdit(art: Articulos) {
      this._ArticulosService.selectedArticulo = Object.assign({}, art);
      console.log(this._ArticulosService.selectedArticulo);
      this.route.navigate(['/crearArticulo']);
    }
  }






