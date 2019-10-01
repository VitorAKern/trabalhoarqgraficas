let Width = 16;
let Height = 16;
var memory = new Array(Width * Height);
let vars = [];
var ac = null;
var ac2 = null;
var ac3 = null;
var pc = 0;
var pos = [];
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

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
      debugger;
      this.setAC(memory[this.getValue(memory[pc + 1])], "1");
      break;
    case "LD2":
      this.setAC(memory[this.getValue(memory[pc + 1])], "2");
      this.setAC(memory[this.getValue(memory[pc + 1])], "1");
      break;
    case "LD2":
      this.setAC(memory[this.getValue(memory[pc + 1])], "2");
      break;
    case "LD3":
      this.setAC(memory[this.getValue(memory[pc + 1])], "3");
      break;
    case "ST":
      memory[this.getValue(memory[pc + 1])] = ac;
      document.getElementById(`text${this.getValue(memory[pc + 1])}`).innerHTML = ac;
      break;
    case "ST2":
      memory[this.getValue(memory[pc + 1])] = ac2;
      document.getElementById(`text${this.getValue(memory[pc + 1])}`).innerHTML = ac2;
      break;
    case "ST3":
      memory[this.getValue(memory[pc + 1])] = ac3;
      document.getElementById(`text${this.getValue(memory[pc + 1])}`).innerHTML = ac3;
      break;
    case "JP":
      if (ac > 0) {
        this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      }
      break;
    case "JZ":
      if (ac == 0) {
        this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      }
      break;
    case "JNZ":
      if (ac != 0) {
        this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      }
      break;
    case "JN":
      if (ac < 0) {
        this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      }
      break;
    case "JMP":
      this.atualizaPC(this.getValue(memory[pc + 1]) - 1);
      break;
    case "POS":
      debugger;
      pos[0] = ac;
      pos[1] = ac2
      break;
    case "PXL":
      context.fillStyle = `rgb(${ac},${ac2},${ac3})`;
      context.fillRect(pos[0], pos[1], 5, 5);
      break;
    case "ADD":
      if (isNaN(memory[pc + 1].replace("#", ""))) {
        debugger;
        ac += parseInt(memory[this.getValue(memory[pc + 1])]);
      }
      else {
        ac += parseInt(memory[pc + 1].replace("#", ""));
      }
      this.setAC(ac);
      break;
    case "SUB":
      if (isNaN(memory[pc + 1].replace("#", ""))) {
        debugger;
        ac -= parseInt(memory[this.getValue(memory[pc + 1])]);
      } else {
        ac -= parseInt(memory[pc + 1].replace("#", ""));
      }
      this.setAC(ac);
      break;
    case "HALT":
      this.atualizaPC(0);
      return true;
      break;
  }
  pc++;
  this.atualizaPC(pc);
}

function executeAll() {
  let end = false;
  while (!end) {
    end = this.executeStep();
  }
}

function getValue(key) {
  return vars.find(o => o.key === key).value;
}

function clearMemory() {
  memory = new Array(Width * Height);
  vars = [];
  pc = 0;
  ac = 0;
  ac2 = 0;
  ac3 = 0;
  context.clearRect(0, 0, 256, 256);
  this.atualizaPC(pc);
  this.setAC(ac, "1");
  this.setAC(ac2, "2");
  this.setAC(ac3, "3");
  this.drawMemory();
}

function atualizaPC(pos) {
  pc = pos;
  document.getElementById("pc").value = pc;
}

function setAC(value, cmd) {
  switch (cmd) {
    case "1":
      ac = parseInt(value);
      document.getElementById("ac").value = value;
      break;
    case "2":
      ac2 = parseInt(value);
      document.getElementById("ac2").value = value;
      break;
    case "3":
      ac3 = parseInt(value);
      document.getElementById("ac3").value = value;
      break;
  }

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