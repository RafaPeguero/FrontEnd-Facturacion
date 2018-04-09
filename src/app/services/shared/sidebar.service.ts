import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
{
  titulo: 'Principal',
  icono: 'mdi mdi-gauge',
  submenu: [
    { titulo: 'Dashboard', url: '/dashboard'},
    // { titulo: 'ProgressBar', url: '/progress'},
    // { titulo: 'Gráficas', url: '/graficas1'},
    // { titulo: 'Promesas', url: '/promesas'},
    // { titulo: 'RXJS', url: '/Rxjs'}
  ]
},
{
  titulo: 'Mantenimientos',
  icono: 'mdi mdi-folder-lock-open',
  submenu: [
    {titulo: 'Usuarios', url: '/usuarios'},
    {titulo: 'Articulos', url: '/articulos'},
    {titulo: 'Clientes', url: '/clientes'},
    {titulo: 'Vendedores', url: '/vendedores'},
    {titulo: 'Condiciones de pago', url: '/pagos'},
    {titulo: 'Facturacion', url: '/facturacion'},
    {titulo: 'Asientos contables', url: '/asientos'}
  ]
}
  ];

  constructor() { }

}
