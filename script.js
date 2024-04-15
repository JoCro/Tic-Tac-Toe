let fields = [null, null, null, null, null, null, null, null, null];

function init(){
  render();
}

function render() {
  const contentDiv = document.getElementById('content');
  let tableHTML = '<table id="table">';

  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';

    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = fields[index] ? fields[index] : '';
      tableHTML += `<td onclick="placeSymbol(${index}, this)">${symbol}</td>`;
    }

    tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  contentDiv.innerHTML = tableHTML;
}

function placeSymbol(index, tdElement) {
  if (fields[index] === null) {
    const symbol = (fields.filter(Boolean).length % 2 === 0) ? generateCircleSVG("#00B0EF") : generateCrossSVG("#FFC000");
    tdElement.innerHTML = symbol;
    fields[index] = (fields.filter(Boolean).length % 2 === 0) ? 'circle' : 'cross';
    tdElement.onclick = null;
  }
  checkWinner();
}


function generateCircleSVG(color) {
  return `
    <svg width="70" height="70">
      <circle cx="35" cy="35" r="0" stroke="${color}" stroke-width="5" fill="none">
        <animate attributeName="r" from="0" to="30" dur="200ms" fill="freeze" />
      </circle>
    </svg>
  `;
}

function generateCrossSVG(color) {
  return `
    <svg width="70" height="70">
      <line x1="10" y1="10" x2="60" y2="60" stroke="${color}" stroke-width="10">
        <animate attributeName="x2" from="10" to="60" dur="200ms" fill="freeze" />
        <animate attributeName="y2" from="10" to="60" dur="200ms" fill="freeze" />
      </line>
      <line x1="60" y1="10" x2="10" y2="60" stroke="${color}" stroke-width="10">
        <animate attributeName="x2" from="60" to="10" dur="200ms" fill="freeze" />
        <animate attributeName="y2" from="10" to="60" dur="200ms" fill="freeze" />
      </line>
    </svg>
  `;
}

function generateSymbol(symbol) {
  return symbol === 'circle' ? generateCircleSVG("#00B0EF") : generateCrossSVG("#FFC000");
}

function checkWinner() {
  const winningCombinations = [
    // horizontale Gewinnkombinationen
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertikale Gewinnkombinationen
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonale Gewinnkombinationen
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinningLine(combination); // Zeichne eine Linie über die Gewinnerfelder
      console.log (fields[a]); // Die Person hat gewonnen
    }
  }

  // Es gibt keinen Gewinner
  console.log (null);
}

function drawWinningLine(combination) {
  const svgHTML = generateWinningLineSVG(combination);
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML += svgHTML;
}


function generateWinningLineSVG(combination) {
  const [a, b, c] = combination;
  const contentRect = document.getElementById('table').getBoundingClientRect();
  const cellWidth = contentRect.width / 3;
  const cellHeight = contentRect.height / 3;
  const lineColor = "#FF0000";
  const strokeWidth = 5;

  let startX, startY, endX, endY;

  if (a === 0 && c === 8) {
    startX = 0;
    startY = 0;
    endX = contentRect.width;
    endY = contentRect.height;
  } else if (a === 2 && c === 6) {
    startX = contentRect.width;
    startY = 0;
    endX = 0;
    endY = contentRect.height;
  } else {
    startX = (a % 3) * cellWidth + (cellWidth / 2);
    startY = Math.floor(a / 3) * cellHeight + (cellHeight / 2);
    endX = (c % 3) * cellWidth + (cellWidth / 2);
    endY = Math.floor(c / 3) * cellHeight + (cellHeight / 2);
  }

  const svgHTML = `
    <svg width="${contentRect.width}" height="${contentRect.height}" style="position: absolute; pointer-events: none;">
      <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${lineColor}" stroke-width="${strokeWidth}"/>
    </svg>
  `;

  return svgHTML;
}

function restart(){

  fields = [null,null,null,null,null,null,null,null,null];
  render();

}






