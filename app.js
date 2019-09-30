let Width = 8;
let Height = 8;
var memory = new Array(Width * Height);
var debug = true;
var ac = null;
const command = {
  INICIO: 'INICIO',
  FIM: 'FIM',
  LD: 'LD',
  LD2: 'LD2',
  LD3: 'LD3',
  DB: 'DB'
}

function render() {
  let html = '<table cellpadding=0 cellspacing=0>'

  for (let row = 0; row < Height; row++) {
    html += '<tr>'

    for (let column = 0; column < Width; column++) {
      const pixelIndex = column + (Width * row)

      html += '<td>'
      html += `<div id=${pixelIndex} class="pixel-index">${pixelIndex}<br><span class="texto" id="text${pixelIndex}"></span></div>`
      html += '</td>'
    }

    html += '</tr>'
  }

  html += '</table>';

  document.querySelector('#Memory').innerHTML = html;
}

function setData() {

}

function execute() {
  var data = false;
  var code = false;
  var operators = {};
  // var dictCache = {}
  // dictCache['INICIO'] = 1;
  // var a = 'INICIO';
  // console.log(dictCache[a]);

  // dictCache[var]
  var lines = document.getElementById('Code').value.split('\n');
  var memCount = 0;
  let auxCode = [];
  let arrProcessor = [];

  for (let i = 0; i < lines.length; i++) {
    arrProcessor.push(lines[i].trimStart().split(' '));
  }
  // Joga todos os comandos pra memória
  for (let i = 0; i < arrProcessor.length; i++) {
    memCount++;
    for (let j = 0; j < arrProcessor[i].length; j++) {
      memory[memCount] = arrProcessor[i][j];
      memCount++;
    }
  }


  for (let i = 0; i < memory.length; i++) {
    if (memory[i] === ".enddata") {
      data = false;
    }

    if (data === true) {
      if (memory[i].toString().endsWith(':')) {
        operators[memory[i]];
      }
    }

    if (memory[i] === ".data") {
      data = true;
    }
  }
  console.log(memory);
  // for (let i = 0; i < arrProcessor.length; i++){
  //   debugger;
  //   if(arrProcessor[i][0] === ".enddata")
  //   {
  //     data = false;
  //   }

  //   if (data === true){

  //     console.log(arrProcessor[i]);
  //   }

  //   if (arrProcessor[i][0] === ".data"){
  //     data = true;
  //   }


  // }
  // //Separa os blocos data e code em dois arrays auxiliares
  // for (let i = 0; i < lines.length; i++) {
  //   if (lines[i].toString().trimStart() === ".data") {
  //     while (lines[i].toString().trimStart() !== ".enddata") {
  //       if (lines[i + 1].toString().trimStart() !== ".enddata") {
  //         auxData.push(lines[i + 1]);
  //       }
  //       i++;
  //     }
  //   }

  //   if (lines[i].toString().trimStart() === ".code") {
  //     while (lines[i].toString().trimStart() !== ".endcode") {
  //       if (lines[i + 1].toString().trimStart() !== ".endcode") {
  //         auxCode.push(lines[i + 1]);
  //       }
  //       i++;
  //     }
  //   }
  // }

  //SET DADOS NA MEMORIA
  // for (let i = 0; i < auxData.length; i++) {
  //   var arrComandos = auxData[i].trimStart().split(' ');
  //   for (var k = 0; k < arrComandos.length; k++) {
  //     arrComandos[k].toString().endsWith(":");
  //     if (arrComandos[k].toString() === "DB") {
  //       arrTable[i] = `${arrComandos[k - 1]}[${arrComandos[k + 1].replace("#", "").replace(",", "")}]`;
  //       arrTable[arrComandos[k + 1].replace("#", "").replace(",", "")] = arrComandos[k + 2].replace("#", "");
  //       document.getElementById(`text${i}`).innerText = arrTable[i];
  //       document.getElementById(`text${arrComandos[k + 1].replace("#", "").replace(",", "")}`).innerText = arrTable[arrComandos[k + 1].replace("#", "").replace(",", "")];
  //     }
  //   };
  // }
  // console.log(arrTable);
  //   for (let i = 0; i < auxCode.length; i++) {
  //     var arrComandos = auxCode[i].trimStart().split(' ');

  //     switch (arrComandos[i].toString()) {
  //       case "INICIO:":
  //         arrTable[i + auxData.length] = `${arrComandos[i + 1]}[${arrComandos[i + 2]}]`;
  //         document.getElementById(`text${i + auxData.length}`).innerText = "INICIO";
  //         document.getElementById(`text${i + auxData.length + 1}`).innerText = arrTable[i + auxData.length];
  //         break;
  //       case "FIM:":
  //         i = auxCode.length;
  //         break;
  //     }
  //   }
  //RUN CODE
}

this.render();