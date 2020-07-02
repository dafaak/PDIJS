import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent implements OnInit {
  //@Input() matriz: object;
  @Input() matriz: [][];
  // @Output() matrizModificada: EventEmitter<Object | boolean> = new EventEmitter<Object | boolean>();
  formMatriz: FormGroup;

  constructor(private fb: FormBuilder) {
    // this.formMatriz = new FormGroup({});
  }

  ngOnInit(): void {
    this.crearFormulario();
    // this.formMatriz.patchValue(this.matriz);
    this.añadirCampo();
    console.log(this.matriz);
  }

  crearFormulario() {
    this.formMatriz = this.fb.group({
      campo: this.fb.array([])
    });
  }

  get campo(): FormArray {
    return this.formMatriz.get('campo') as FormArray;
  }

  añadirCampo() {
    for (let x = 0; x < this.matriz[`metadata`][`row`]; x++) {
      for (let y = 0; y < this.matriz[`metadata`][`col`]; y++) {
        // let nombreCelda = `valor${x}${y}`;
        const celda = this.fb.group(
          {
            valor: new FormControl(this.matriz[`valor${x}${y}`])
          }
        );
        this.campo.push(celda);
      }
    }
    console.log(this.campo);
  }

  enviarFormulario() {
    console.log('usuario que me llega del form:', this.formMatriz);
  }


}
