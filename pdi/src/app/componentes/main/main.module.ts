import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrearRowColComponent} from './formularios/crear-row-col/crear-row-col.component';
import {CrearRowColModule} from './formularios/crear-row-col/crear-row-col.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatrizComponent} from './formularios/matriz/matriz.component';
import {VentanaComponent} from './formularios/ventana/ventana.component';
import {VentanaModule} from './formularios/ventana/ventana.module';

@NgModule({
  declarations: [CrearRowColComponent, MatrizComponent],
  imports: [
    CommonModule,
    CrearRowColModule,
    ReactiveFormsModule,
    VentanaModule,
  ],
  exports: [
    CrearRowColComponent,
    MatrizComponent
  ],
  entryComponents: [
    CrearRowColComponent,
    VentanaComponent
  ]
})
export class MainModule {
}
