
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS!!!
import { APP_ROUTES } from './app.routes';

// MODULOS!!!
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import {ServiceModule} from './services/service.module';
import { ReactiveFormsModule } from '@angular/forms';


// SERVICIOS!!!
// ESTAN IMPORTADOS EN MODULOS
// COMPONENTES!!
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ArticulosComponent } from './Articulos/articulos/articulos.component';
import { ModalArticulosComponent } from './Articulos/modal-articulos/modal-articulos.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { ModalClienteComponent } from './clientes/modal-cliente/modal-cliente.component';
import { VendedoresComponent } from './vendedores/vendedores/vendedores.component';
import { ModalVendedoresComponent } from './vendedores/modal-vendedores/modal-vendedores.component';
import { AsientoContableComponent } from './asientos/asiento-contable/asiento-contable.component';
import { AsientosModComponent } from './asientos/asientos-mod/asientos-mod.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ArticulosComponent,
    ModalArticulosComponent,
    ClientesComponent,
    ModalClienteComponent,
    VendedoresComponent,
    ModalVendedoresComponent,
    AsientoContableComponent,
    AsientosModComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
