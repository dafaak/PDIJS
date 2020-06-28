import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrearRowColComponent} from './formularios/crear-row-col/crear-row-col.component';
import {CrearRowColModule} from "./formularios/crear-row-col/crear-row-col.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CrearRowColComponent],
  imports: [
    CommonModule,
    CrearRowColModule,
    ReactiveFormsModule
  ],
  exports: [
    CrearRowColComponent
  ],
  entryComponents: [
    CrearRowColComponent
  ]
})
export class MainModule {
}
