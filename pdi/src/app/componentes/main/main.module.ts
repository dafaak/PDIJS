import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrearRowColComponent} from './formularios/crear-row-col/crear-row-col.component';
import {CrearRowColModule} from "./formularios/crear-row-col/crear-row-col.module";
import {ReactiveFormsModule} from "@angular/forms";
import { MatrizComponent } from './formularios/matriz/matriz.component';


@NgModule({
  declarations: [CrearRowColComponent, MatrizComponent],
  imports: [
    CommonModule,
    CrearRowColModule,
    ReactiveFormsModule
  ],
    exports: [
        CrearRowColComponent,
        MatrizComponent
    ],
  entryComponents: [
    CrearRowColComponent
  ]
})
export class MainModule {
}
