import {Component, OnInit} from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {floor, size, sort} from 'mathjs'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  row;
  col;
  largo;
  ancho;
  data = [];
  matriz = {};
  disabledBotonCrearMatriz = true;
  disabledBotonFiltros = true;
  esNumerico = false;
  caracteres = ['&', '@', '#', '*', '+', '/', '-', ';', ',', '.', ' '];
  matrizCaracteres = [];
  hiden = true;


  constructor() {
  }

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

  capturarDatosLargoAncho(event) {
    this.largo = event.length;
    this.ancho = event.width;
    if (!isNaN(event.length) && !isNaN(event.width) && event.length > 0 && event.width > 0) {
      this.disabledBotonFiltros = false;
    } else {
      this.disabledBotonFiltros = true;
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
    const table = document.getElementById('tabla') as HTMLTableElement;
    table.innerHTML = '';
    const tHeader = document.createElement('thead');
    const trh = document.createElement('tr');
    const num = document.createElement('th');
    num.scope = 'col';
    num.textContent = '#';
    trh.appendChild(num);
    for (let f = 0; f < array.length; f++) {
      const header = document.createElement('th');
      header.scope = 'col';
      header.style.border = '1px';
      header.style.borderStyle = 'ridge';
      header.className = 'table-info';
      header.textContent = '' + f;
      trh.appendChild(header);
    }
    tHeader.appendChild(trh);
    table.appendChild(tHeader);
    for (let i = 0; i < array.length; i++) {
      const row = document.createElement('tr');
      const header = document.createElement('th');
      header.scope = 'row';
      header.className = 'table-info';
      header.textContent = '' + i;
      row.appendChild(header);
      for (let j = 0; j < array[i].length; j++) {
        const cell = document.createElement('td');
        cell.textContent = array[i][j];
        cell.contentEditable = 'true';
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

  filtroVentanaRectangulares() {
    const matrizSalida = this.data.map(function (arr) {
      return arr.slice();
    });
    const sizeMatriz = size(matrizSalida)
    const ventana = [];
    const bordeX = floor(this.ancho / 2)
    const bordeY = floor(this.largo / 2)
    console.log('bordes', bordeX, bordeY)
    for (var x = bordeX; x <= sizeMatriz[0] - bordeX - 1; x++) {
      for (var y = bordeY; y <= sizeMatriz[1] - bordeY - 1; y++) {
        let i = 0;
        for (var fx = 0; fx < this.ancho; fx++) {
          for (var fy = 0; fy < this.largo; fy++) {
            const indiceX = x + fx - bordeX
            const indiceY = y + fy - bordeY
            const valor = this.data[indiceX][indiceY]
            ventana.push(valor);
            i++;

          }
        }
        sort(ventana)
        matrizSalida[x][y] = ventana[floor(ventana.length / 2)]
        ventana.splice(0, ventana.length)
      }
    }
    this.makeTable(matrizSalida);
  }

}
