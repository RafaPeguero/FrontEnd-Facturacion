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
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ]
},
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);