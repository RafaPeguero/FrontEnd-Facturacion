import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DatosPipe } from './datos.pipe';


@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe,
    DatosPipe
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
