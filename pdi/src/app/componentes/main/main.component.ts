import {Component, OnInit} from '@angular/core';
import {newArray} from '@angular/compiler/src/util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() {
  }

  row;
  col;
  data = [];
  matriz = {};
  disabledBotonCrearMatriz = true;
  esNumerico = false;
  caracteres = ['&', '@', '#', '*', '+', '/', '-', ';', ',', '.', ' '];
  matrizCaracteres = [];
  hiden = true;

  ngOnInit(): void {
  }

  capturarDatos(event) {
    this.row = event.row;
    this.col = event.col;
    if (!isNaN(event.row) && !isNaN(event.col) && event.row > 0 && event.col > 0) {
      this.disabledBotonCrearMatriz = false;
    } else {
      this.disabledBotonCrearMatriz = true;
      this.hiden = true;
    }
  }

  crearJsonEnviar() {
    for (let x = 0; x < this.row; x++) {
      for (let y = 0; y < this.col; y++) {
        this.matriz[`valor${x}${y}`] = {};
        this.matriz[`valor${x}${y}`][`valor`] = this.data[x][y];
        this.matriz[`valor${x}${y}`][`nombre`] = `valor${x}${y}`;
      }
    }
    this.matriz[`valor`] = 2;
    this.matriz[`metadata`] = {};
    this.matriz[`metadata`][`row`] = Number(this.row);
    this.matriz[`metadata`][`col`] = Number(this.col);
  }


  crearMatriz() {
    if (!isNaN(this.row) && !isNaN(this.col)) {
      this.data = newArray(this.row - 1);
      this.matrizCaracteres = newArray(this.row - 1);
      let x = 0;
      let y = 0;
      for (x; x < this.row; x++) {
        this.data[x] = newArray(this.col - 1);
        this.matrizCaracteres[x] = newArray(this.row - 1);
      }

      for (x = 0; x < this.row; x++) {
        for (y = 0; y < this.col; y++) {
          this.data[x][y] = Math.floor(Math.random() * 11) * 10;
        }
      }
      this.hiden = false;
    }

    this.mostrarMatrizNumerica();
  }

  makeTable(array) {
    const table = document.getElementById('tabla');
    table.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < array[i].length; j++) {
        const cell = document.createElement('td');
        cell.textContent = array[i][j];
        cell.contentEditable = 'true';
        cell.style.textAlign = 'center';
        cell.style.border = '0';
        cell.style.padding = '0';
        cell.style.margin = '0';
        cell.style.borderCollapse = 'collapse';
        cell.style.borderSpacing = '0';
        if (this.esNumerico) {
          cell.style.border = '1px';
          cell.style.padding = '1px';
          cell.style.borderStyle = 'ridge';
        }


        row.appendChild(cell);
        row.style.borderCollapse = 'collapse';
        row.style.borderSpacing = '0';
      }
      table.appendChild(row);
      if (this.esNumerico) {
        table.style.border = '1px';
        table.style.padding = '1px';
        table.style.borderStyle = 'ridge';
      } else {
        table.style.borderCollapse = 'collapse';
        table.style.borderSpacing = '0';
        table.style.border = '0';
        table.style.padding = '0';
        table.style.borderStyle = 'ridge';
      }

    }
    document.body.appendChild(table);
  }

  transformarCaracteres() {
    this.esNumerico = false;
    let indice = 0;
    for (let x = 0; x < this.row; x++) {
      for (let y = 0; y < this.col; y++) {
        indice = (this.data[x][y] / 10);
        this.matrizCaracteres[x][y] = this.caracteres[indice];
      }
    }
    this.makeTable(this.matrizCaracteres);

  }

  mostrarMatrizNumerica() {
    this.esNumerico = true;
    this.makeTable(this.data);
  }

  caracterSegunNumero(numero) {
    return this.caracteres[numero / 10];
  }

  actualizarTabla() {
    const table = (document.getElementById('tabla') as HTMLTableElement);
    for (let r = 0; r < this.row; r++) {
      for (let c = 0; c < this.col; c++) {
        const dato = table.rows[r].cells[c].innerText;
        const isnum = !isNaN(Number(dato));

        console.log(isnum);
        if (isnum && dato.trim() !== '') {

          console.log('es num dtao:', dato);
          const numero = dato;
          this.data[r][c] = numero;
          const caracterNuevo = this.caracterSegunNumero(numero);
          this.matrizCaracteres[r][c] = caracterNuevo;
        }
      }
    }

  }
}
