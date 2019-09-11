let Width = 8;
let Height = 8;
var memory = new Array(Width * Height);
var debug = true;

const command = {
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
        const pixelIndex = column + ( Width * row )
  
        html += '<td>'
        html += `<div id=${pixelIndex} class="pixel-index">${pixelIndex}</div>`
        html += '</td>'
      }
  
      html += '</tr>'
    }
  
    html += '</table>';
  
    document.querySelector('#Memory').innerHTML = html  ;
  }

  function execute(){
    var lines = document.getElementById('Code').value.split('\n');
    let aux;
    var position;
    var stopCond;
    for(var i = 0;i < lines.length;i++){
        let aux = lines[i];
        for(let j = 0; j < lines[i].length; i++){
            if(stopCond == true){
                if(aux[j] == " "){
                    stopCond = false;
                    break;
                }
                position += aux[j];
            }
            if(aux[j] == "#"){
                stopCond = true;
                position = aux[j+1] + aux[j+2];
            }
        }
        commands = lines[i].substring(1,3);

        switch(commands){
            case commands.DB:
            document.getElementById(position).value = "50"

        }
        //code here using lines[i] which will give you each line
    }
  }

  this.render();