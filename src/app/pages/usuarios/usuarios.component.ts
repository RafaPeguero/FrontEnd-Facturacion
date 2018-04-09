import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Title } from '@angular/platform-browser';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var sweetAlert: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistro: number = 0;
  cargando: boolean = true;
  constructor( public _UsuarioService: UsuarioService,
                public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal( id: string) {
    this._modalUploadService.MostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._UsuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistro = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistro) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
     this._UsuarioService.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {

     this.usuarios = usuarios;
     this.cargando = false;
     });
  }


  borrarUsuario (usuarios: Usuario) {
    if ( usuarios._id === this._UsuarioService.usuario._id) {
      swal('No puede borrar usuario' , 'No se puede borrar a si mismo', 'error');
      return;
    }

    sweetAlert({
      title: 'Está seguro?',
      text: 'Está a punto de borar a ' + usuarios.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._UsuarioService.borrarUsuario(usuarios._id).subscribe(borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }

    });


  }

  guardarUsuario(usuarios: Usuario) {
    this._UsuarioService.actualizarUsuario(usuarios).subscribe();
  }

}
