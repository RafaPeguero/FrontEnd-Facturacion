import { Routes, RouterModule } from '@angular/router';
// COMPONENTES!!!
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { ArticulosComponent } from './../Articulos/articulos/articulos.component';
import { ModalArticulosComponent } from './../Articulos/modal-articulos/modal-articulos.component';

import {ClientesComponent} from './../clientes/clientes/clientes.component';
import { ModalClienteComponent } from './../clientes/modal-cliente/modal-cliente.component';
import { VendedoresComponent } from '../vendedores/vendedores/vendedores.component';
import { ModalVendedoresComponent } from '../vendedores/modal-vendedores/modal-vendedores.component';
import { AsientoContableComponent} from './../asientos/asiento-contable/asiento-contable.component';
 import { AsientosModComponent } from './../asientos/asientos-mod/asientos-mod.component';
import { AsientosContabilidadComponent } from './../asientos/asientos-contabilidad/asientos-contabilidad.component';
import { FacturacionComponent } from '../facturacion/facturacion/facturacion.component';
import { FacturacionModalComponent } from '../facturacion/facturacion-modal/facturacion-modal.component';
import { DetallesFacturaComponent } from '../detalles/detalles-factura/detalles-factura.component';
import { DetallesModalComponent } from '../detalles/detalles-modal/detalles-modal.component';









const pagesRoutes: Routes = [
  {path: '',
  component:
  PagesComponent,
  canActivate: [ LoginGuardGuard ],
  children: [
    {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
    {path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBars'} },
    {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficos'}},
    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    {path: 'Rxjs', component: RxjsComponent, data: {titulo: 'RxJs'} },
    {path: 'account-settings', component: AccountSettingsComponent , data: {titulo: 'Ajustes de temas'}},
    {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
    // Mantenimientos
    {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'} },


    {path: 'articulos', component: ArticulosComponent, data: {titulo: 'Lista de articulos'} },
    {path: 'crearArticulo', component: ModalArticulosComponent, data: {titulo: 'Mantenimiento de articulos'} },
    {path: 'clientes', component: ClientesComponent, data: {titulo: 'Lista de clientes'} },
    {path: 'crearCliente', component: ModalClienteComponent, data: {titulo: 'Mantenimiento de clientes'} },
    {path: 'vendedores', component: VendedoresComponent, data: {titulo: 'Lista de vendedores'} },
    {path: 'crearVendedor', component: ModalVendedoresComponent, data: {titulo: 'Mantenimiento de vendedores'} },
    {path: 'asientos', component: AsientoContableComponent, data: {titulo: 'Asientos Contables'} },
    {path: 'crearAsiento', component: AsientosModComponent, data: {titulo: 'Mantenimiento de Asientos contables'} },
    {path: 'asientosToContabilidad', component: AsientosContabilidadComponent, data: {titulo: 'Asientos para Contabilidad'} },
    {path: 'facturacion', component: FacturacionComponent, data: {titulo: 'Facturacion'} },
    {path: 'crearFactura', component: FacturacionModalComponent, data: {titulo: 'Mantenimiento de facturas'} },
    {path: 'detallesFactura', component: DetallesFacturaComponent, data: {titulo: 'Detalles factura'} },
    {path: 'crearDetalles', component: DetallesModalComponent, data: {titulo: 'Mantenimiento  detalles de factura'} },
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ]
},
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
