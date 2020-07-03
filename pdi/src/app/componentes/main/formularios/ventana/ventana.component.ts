import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.component.html',
  styleUrls: ['./ventana.component.css']
})
export class VentanaComponent implements OnInit {
  @Output() lengthAndWidth: EventEmitter<Object | boolean> = new EventEmitter<Object | boolean>();
  formLW: FormGroup;

  constructor() {
    this.formLW = new FormGroup({
      length: new FormControl('', ),
      width: new FormControl('', ),
    });
    this.escucharFormulario();
  }

  ngOnInit(): void {
  }

  escucharFormulario() {
    this.formLW
      .valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(
        valoresFormulario => {
          const esFormularioValido = this.formLW.valid;
          if (!esFormularioValido) {

            this.lengthAndWidth.emit(false);


          } else {
            this.lengthAndWidth.emit(valoresFormulario);
          }

        }
      );
  }

}
