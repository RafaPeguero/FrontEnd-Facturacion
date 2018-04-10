import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {
  SettingsService,
  SidebarService,
  ShredService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  ArticulosServiceService,
  ClientesServiceService,
  VendedoresServiceService,
  AsientosServiceService
} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    ShredService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    ArticulosServiceService,
    ClientesServiceService,
    VendedoresServiceService,
    AsientosServiceService
  ]
})
export class ServiceModule { }
