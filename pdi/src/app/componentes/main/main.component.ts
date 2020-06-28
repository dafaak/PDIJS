import {Component, OnInit} from '@angular/core';
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  row;
  col;
  data = []

  constructor() {
  }

  ngOnInit(): void {
  }

  capturarDatos(event) {
    this.row = event.row;
    this.col = event.col;
    console.log(this.row, this.col)
  }


  crearMatriz() {

    if (!isNaN(this.row) && !isNaN(this.col)) {
      let imagen = newArray(this.row - 1);
      let x = 0;
      let y = 0;
      for (x; x < this.row; x++) {
        imagen[x] = newArray(this.col - 1);
      }

      for (x = 0; x < this.row; x++) {
        for (y = 0; y < this.col; y++) {
          imagen[x][y] = Math.floor(Math.random() * 11) * 10;      // returns a random integer from 0 to 10
        }
      }
      this.data = imagen;
      console.log(imagen)
    }
  }
}
