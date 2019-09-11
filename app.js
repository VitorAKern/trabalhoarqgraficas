let Width = 8;
let Height = 8;
var memory = new Array(Width * Height);
var debug = true;

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
    for(var i = 0;i < lines.length;i++){
        //code here using lines[i] which will give you each line
    }
  }
  this.render();