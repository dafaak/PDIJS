import {Component, OnInit} from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {floor, size, sort, round} from 'mathjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  row;
  col;
  x;
  y;
  data = [];
  histograma = [];
  grafico = {
    data: [{x: [1, 2, 3], y: [1, 2, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'}}],
    layout: {width: 320, height: 240, title: 'A Fancy Plot'}
  };
  numBins = 101;

  disabledBotonCrearMatriz = true;
  disabledBotonaplicarFiltro = true;
  disabledBotonesFiltrosMasPor = true;
  histogramaCreado = false;
  esNumerico = true;
  caracteres = [' ', '.', ',', ';', '-', '/', '+', '*', '#', '@', '&'];
  matrizCaracteres = [];
  hiden = true;


  matrixPrueba1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 80, 20, 80, 80, 80, 80, 0, 0],
    [0, 0, 80, 0, 0, 0, 0, 80, 0, 0],
    [0, 0, 80, 0, 0, 0, 0, 80, 0, 0],
    [0, 0, 80, 0, 0, 0, 0, 80, 0, 0],
    [0, 0, 80, 0, 0, 0, 0, 20, 0, 0],
    [0, 0, 80, 80, 80, 80, 80, 80, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];


  matrixPrueba2 = [
    [0, 80, 80, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 80, 20, 80, 80, 80, 80, 0, 0],
    [0, 0, 80, 80, 80, 80, 80, 80, 0, 0],
    [0, 0, 80, 80, 20, 80, 80, 80, 0, 0],
    [0, 0, 80, 80, 80, 80, 80, 80, 0, 0],
    [0, 0, 80, 80, 80, 80, 80, 20, 0, 0],
    [0, 0, 80, 80, 80, 80, 80, 80, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  matrizGrande = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 60, 0, 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0],
    [0, 80, 80, 0, 0, 0, 0, 0, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 80, 20, 80, 80, 80, 80, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 80, 80, 20, 80, 80, 80, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 10, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 0, 0, 0, 100, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 20, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  cubo = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 70, 70, 70, 70, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 70, 70, 70, 70, 50, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 70, 70, 70, 70, 50, 50, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 70, 70, 70, 70, 50, 50, 50, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 100, 100, 100, 50, 50, 50, 50, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 100, 100, 100, 50, 50, 50, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 100, 100, 100, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 100, 100, 100, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 100, 100, 100, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  piramide = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 100, 100, 80, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 100, 100, 100, 80, 80, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 100, 100, 100, 100, 80, 80, 80, 0, 0, 0, 0, 0],
    [0, 0, 0, 100, 100, 100, 100, 100, 80, 80, 80, 80, 0, 0, 0, 0],
    [0, 0, 100, 100, 100, 100, 100, 100, 80, 80, 80, 80, 80, 0, 0, 0],
    [0, 100, 100, 100, 100, 100, 100, 100, 80, 80, 80, 80, 80, 80, 0, 0],
    [0, 0, 0, 100, 100, 100, 100, 100, 80, 80, 80, 80, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 100, 100, 100, 80, 80, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 100, 100, 80, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  ];

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

    this.y = event.length;
    this.x = event.width;

    if (!isNaN(event.length) && !isNaN(event.width) && event.length > 0 && event.width > 0) {
      this.disabledBotonaplicarFiltro = false;
      this.disabledBotonesFiltrosMasPor = false;
    } else {
      this.disabledBotonaplicarFiltro = true;
    }
    if (!isNaN(event.width) && event.width > 0) {
      this.disabledBotonesFiltrosMasPor = false;
    } else {
      this.disabledBotonesFiltrosMasPor = true;
    }
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
      this.histogramaCreado = false;
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

        cell.style.border = '0';
        cell.style.padding = '0';
        cell.style.margin = '0';
        cell.style.borderCollapse = 'collapse';
        cell.style.borderSpacing = '0';
        if (this.esNumerico) {
          cell.style.border = '1px';
          cell.style.padding = '1px';
          cell.style.borderStyle = 'ridge';
          cell.contentEditable = 'true';
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
    let indice = 0;
    for (let x = 0; x < this.row; x++) {
      for (let y = 0; y < this.col; y++) {
        indice = (this.data[x][y] / 10);
        this.matrizCaracteres[x][y] = this.caracteres[indice];

      }
    }


  }

  mostrarMatrizCaracteres() {
    this.esNumerico = false;
    this.transformarCaracteres();
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
    for (let r = 1; r <= this.row; r++) {
      for (let c = 1; c <= this.col; c++) {
        const dato = table.rows[r].cells[c].innerText;
        const isnum = !isNaN(Number(dato));

        if (isnum && dato.trim() !== '') {
          const numero = dato;
          this.data[r - 1][c - 1] = numero;
          const caracterNuevo = this.caracterSegunNumero(numero);
          this.matrizCaracteres[r - 1][c - 1] = caracterNuevo;
        }
      }
    }
    this.histogramaCreado = false;

  }

  filtroVentanaRectangulares() {
    const matrizSalida = this.data.map((arr) => {
      return arr.slice();
    });

    const sizeMatriz = size(matrizSalida);
    const ventana = [];
    const bordeX = floor(this.x / 2);
    const bordeY = floor(this.y / 2);
    for (let x = bordeX; x <= sizeMatriz[0] - bordeX - 1; x++) {
      for (let y = bordeY; y <= sizeMatriz[1] - bordeY - 1; y++) {
        let i = 0;
        for (let fx = 0; fx < this.x; fx++) {
          for (let fy = 0; fy < this.y; fy++) {
            const indiceX = x + fx - bordeX;
            const indiceY = y + fy - bordeY;
            const valor = this.data[indiceX][indiceY];
            ventana.push(valor);
            i++;

          }
        }
        sort(ventana);
        matrizSalida[x][y] = ventana[floor(ventana.length / 2)];
        ventana.splice(0, ventana.length);
      }
    }

    this.data = matrizSalida.map((arr) => {
      return arr.slice();
    });
    // this.makeTable(matrizSalida);
    this.histogramaCreado = false;
    (this.esNumerico) ? this.mostrarMatrizNumerica() : this.mostrarMatrizCaracteres();
  }

  filtroVentanaMas() {
    const matrizSalida = this.data.map((arr) => {
      return arr.slice();
    });
    const ventana = [];
    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data[0].length; y++) {
        for (let rango = 1; rango <= this.x; rango++) {

          // Control de bordes
          const xArriba = (x - rango < 0) ? 0 : x - rango;
          const xDebajo = (x + rango > this.data.length - 1) ? this.data.length - 1 : x + rango;
          const yIzquierda = (y - rango < 0) ? 0 : y - rango;
          const yDerecha = (y + rango > this.data[0].length - 1) ? this.data[0].length - 1 : y + rango;
          ventana.push(
            this.data[xArriba][y], // arriba
            this.data[xDebajo][y], // debajo
            this.data[x][yIzquierda], // izquierda
            this.data[x][yDerecha] // derecha
          );
        }
        ventana.push(this.data[x][y]);
        sort(ventana);
        matrizSalida[x][y] = ventana[floor(ventana.length / 2)];
        ventana.splice(0, ventana.length);
      }
    }
    // this.makeTable(matrizSalida);
    this.data = matrizSalida.map((arr) => {
      return arr.slice();
    });
    this.histogramaCreado = false;
    (this.esNumerico) ? this.mostrarMatrizNumerica() : this.mostrarMatrizCaracteres();

  }

  filtroVentanaPor() {

    const matrizSalida = this.data.map((arr) => {
      return arr.slice();
    });
    const ventana = [];
    for (let x = 0; x < this.data.length; x++) {
      for (let y = 0; y < this.data[0].length; y++) {
        for (let rango = 1; rango <= this.x; rango++) {

          // Control de bordes
          const xArriba = (x - rango < 0) ? 0 : x - rango;
          const xDebajo = (x + rango > this.data.length - 1) ? this.data.length - 1 : x + rango;
          const yIzquierda = (y - rango < 0) ? 0 : y - rango;
          const yDerecha = (y + rango > this.data[0].length - 1) ? this.data[0].length - 1 : y + rango;
          ventana.push(
            this.data[xArriba][yDerecha], // arriba derecha
            this.data[xArriba][yIzquierda], // arriba izquierda
            this.data[xDebajo][yDerecha], // debajo derecha
            this.data[xDebajo][yIzquierda] // debajo izquierda
          );
        }
        ventana.push(this.data[x][y]);
        sort(ventana);
        matrizSalida[x][y] = ventana[floor(ventana.length / 2)];
        ventana.splice(0, ventana.length);
      }
    }
    // this.makeTable(matrizSalida);
    this.data = matrizSalida.map((arr) => {
      return arr.slice();
    });
    this.histogramaCreado = false;
    (this.esNumerico) ? this.mostrarMatrizNumerica() : this.mostrarMatrizCaracteres();
  }

  cargarMatrizPrueba1() {
    this.data = this.matrixPrueba1.map((arr) => {
      return arr.slice();
    });
    this.matrizCaracteres = this.matrixPrueba1.map((arr) => {
      return arr.slice();
    });
    this.col = this.matrixPrueba1.length;
    this.row = this.matrixPrueba1[0].length;
    this.hiden = false;
    this.esNumerico = true;
    this.histogramaCreado = false;
    this.makeTable(this.data);
  }

  cargarMatrizPrueba2() {
    this.data = this.piramide.map((arr) => {
      return arr.slice();
    });
    this.matrizCaracteres = this.piramide.map((arr) => {
      return arr.slice();
    });

    this.col = this.piramide.length;
    this.row = this.piramide[0].length;
    this.hiden = false;
    this.esNumerico = true;
    this.histogramaCreado = false;
    this.makeTable(this.data);
  }

  obternerHistograma() {
    const h = this.data.length;
    const w = this.data[0].length;
    const hist: number[] = newArray(this.numBins);
    let i;
    let x;
    let y;
    let idx;
    let val;
    // initialize the histogram
    for (i = 0; i < this.numBins; ++i) {
      hist[i] = 0;
    }
    // loop over every single pixel
    for (x = 0; x < h; ++x, idx += 4) {
      for (y = 0, idx = 0; y < w; y++) {
        val = this.data[x][y];
        hist[val]++;
      }
    }
    // this.grafico.data = [{x: [1, 2, 3], y: [1, 2, 3], type: 'scatter', mode: 'lines+points', marker: {color: 'red'}}];
    console.log(hist);
    this.histogramaCreado = true;
    this.histograma = hist;
  }

  aplicarEcualizacion() {
    let i = 0;
    let j = 0;
    const m = this.data.length;
    const n = this.data[0].length;
    const histCDF: number[] = newArray(this.histograma.length);
    histCDF.map((value, index) => {
      histCDF[index] = 0;
    });
    let sum = 0;
    let cdfmin = 100000;
    for (i = 0; i < this.numBins; i++) {
      if (this.histograma[i] > 0) {
        sum = sum + this.histograma[i];
        histCDF[i] = sum;
        if (this.histograma[i] < cdfmin) {
          cdfmin = this.histograma[i];
        }
      }
    }
    console.log(histCDF);
    console.log(cdfmin);
    for (i = 0; i < m; i++) {
      for (j = 0; j < n; j++) {
        this.data[i][j] = this.ecualizacion(histCDF[this.data[i][j]], cdfmin, m, n, this.numBins);
        console.log(this.ecualizacion(histCDF[this.data[i][j]], cdfmin, m, n, this.numBins));
      }
    }
    this.histogramaCreado = false;
    (this.esNumerico) ? this.mostrarMatrizNumerica() : this.mostrarMatrizCaracteres();

  }

  ecualizacion(cdf, cdfmin, m, n, niveles) {
    let res = round((((cdf - cdfmin) / ((m * n) - cdfmin)) * (niveles - 1)));
    res = res - (res % 10);
    return res;
  }

}
