import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-crear-row-col',
  templateUrl: './crear-row-col.component.html',
  styleUrls: ['./crear-row-col.component.css']
})
export class CrearRowColComponent implements OnInit {
  @Output() rowAndCol: EventEmitter<Object | boolean> = new EventEmitter<Object | boolean>();
  formRowCol: FormGroup;

  constructor() {
    this.formRowCol = new FormGroup({
      row: new FormControl('', ),
      col: new FormControl('', ),
    });
    this.escucharFormulario();
  }

  ngOnInit(): void {
  }

  escucharFormulario() {
    this.formRowCol
      .valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(
        valoresFormulario => {
          const esFormularioValido = this.formRowCol.valid;
          if (!esFormularioValido) {

            this.rowAndCol.emit(false);


          } else {
            this.rowAndCol.emit(valoresFormulario);
          }

        }
      );
  }

}
