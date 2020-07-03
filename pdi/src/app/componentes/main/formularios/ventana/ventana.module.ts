import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {VentanaComponent} from './ventana.component';



@NgModule({
  declarations: [VentanaComponent],
  exports: [
    VentanaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class VentanaModule { }
