let Width = 8;
let Height = 8;
var memory = new Array(Width * Height);
let vars = [];
var ac = null;
var ac2 = null;
var ac3 = null;
var pc = 0;
var pos = new Object({ x: 0, y: 0 });

// const command = {
//   INICIO: 'INICIO',
//   FIM: 'FIM',
//   LD: 'LD',
//   LD2: 'LD2',
//   LD3: 'LD3',
//   DB: 'DB'
// }

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

function executeStep() {
  let command = memory[pc];



  switch (command) {
    case "LD":
      this.setAC(memory[this.getValue(memory[pc + 1])]);
      break;
    case "ST":
      memory[this.getValue(memory[pc + 1])] = ac;
      document.getElementById(`text${this.getValue(memory[pc + 1])}`).innerHTML = ac;
      break;
    case "JZ":
      debugger;
      if (ac == 1) {

        this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      }
      break;
    case "JMP":
      this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      break;
    case "POS":
      this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      break;
    case "PXL":
      this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      break;
    case "ADD":
      ac += parseInt(memory[pc + 1].replace("#", ""));
      this.setAC(ac);
      break;
    case "SUB":
      ac -= parseInt(memory[pc + 1].replace("#", ""));
      this.setAC(ac);
      break;
    case "HALT":
      this.atualizaPC(0);
      this.clearMemory();
      break;
  }
  pc++;
  this.atualizaPC(pc);
}


function getValue(key) {
  return vars.find(o => o.key === key).value;
}

function clearMemory() {
  memory = new Array(Width * Height);
  vars = [];
  pc = 0;
  ac = 0;
  this.atualizaPC(pc);
  this.setAC(ac);
  this.drawMemory();
}

function atualizaPC(pos) {
  pc = pos;
  document.getElementById("pc").value = pc;
}

function setAC(value) {
  ac = parseInt(value);
  document.getElementById("ac").value = value;
}

function load() {
  this.clearMemory();
  this.atualizaPC(pc);
  var data = false;
  var code = false;
  var lines = document.getElementById('Code').value.split('\n');
  var memCount = 0;
  let arrProcessor = [];

  for (let i = 0; i < lines.length; i++) {
    arrProcessor.push(lines[i].trimStart().split(' '));
  }

  for (let i = 0; i < arrProcessor.length; i++) {
    for (let j = 0; j < arrProcessor[i].length; j++) {
      if (arrProcessor[i][j]) {
        if (arrProcessor[i][j] === ".enddata") {
          data = false;
        }
        if (data === true) {
          if (arrProcessor[i][j].toString().endsWith(':')) {
            memory[memCount] = new Object({ key: arrProcessor[i][j].replace(":", ""), value: arrProcessor[i][j + 2].replace("#", "").replace(",", "") });
            if (memory[memCount].key) {
              vars.push({ key: memory[memCount].key, value: memory[memCount].value });
            }
            memCount++;
          }
          if (arrProcessor[i][j].toString() === "DB") {
            memory[arrProcessor[i][j + 1].replace("#", "").replace(",", "")] = arrProcessor[i][j + 2].replace("#", "");
          }
        }
        if (arrProcessor[i][j] === ".data") {
          data = true;
        }

        if (arrProcessor[i][j] === ".endcode") {
          code = false;
        }
        if (code === true) {
          if (arrProcessor[i][j].toString().endsWith(":")) {
            memory[memCount] = new Object({ key: arrProcessor[i][j].replace(":", ""), value: memCount + 1 });
            if (memory[memCount].key) {
              vars.push({ key: memory[memCount].key, value: memory[memCount].value });
            }
            memCount++;
          }
          else {
            memory[memCount] = arrProcessor[i][j];
            memCount++;
          }
        }
        if (arrProcessor[i][j] === ".code") {
          code = true;
        }
      }
    }
  }
  this.drawMemory();
  console.log(memory);
}

function drawMemory() {
  for (let i = 0; i < memory.length; i++) {
    document.getElementById(`text${i}`).innerHTML = memory[i] === undefined ? "" : memory[i].key ? memory[i].key : memory[i];
  }
}

this.render();