document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input[type="number"]');
  const filas = inputs[0];
  const columnas = inputs[1];
  
  
  const container = document.querySelector('.container');
  const resultBox = document.createElement('div');
  resultBox.className = 'mt-4';
  container.appendChild(resultBox);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    resultBox.innerHTML = '';
    
    const n = Number(filas.value);
    const m = Number(columnas.value);
    
    
    if (isNaN(n) || isNaN(m) || n < 1 || m < 1) {
      resultBox.innerHTML = '<div class="alert alert-danger">Ingresa números válidos mayores a 0.</div>';
      return;
    }
    
    if (!Number.isInteger(n) || !Number.isInteger(m)) {
      resultBox.innerHTML = '<div class="alert alert-danger">Ingresa números enteros.</div>';
      return;
    }
    
    
    const matriz = Array(n).fill(0).map(() => Array(m).fill(0));
    
    
    const esquinas = [
      { fila: 0, col: 0 },
      { fila: 0, col: m - 1 },
      { fila: n - 1, col: 0 },
      { fila: n - 1, col: m - 1 }
    ];
    
    let sumaEsquinas = 0;
    const valoresEsquinas = {};
    
    esquinas.forEach((esquina, index) => {
      
      if (esquina.fila < n && esquina.col < m) {
        const valor = Math.floor(Math.random() * 100) + 1;
        matriz[esquina.fila][esquina.col] = valor;
        sumaEsquinas += valor;
        valoresEsquinas[`esquina${index}`] = {
          posicion: `[${esquina.fila},${esquina.col}]`,
          valor: valor
        };
      }
    });
    
    
    const info = document.createElement('div');
    let infoEsquinas = '<ul>';
    
    if (n > 1 || m > 1) {
      infoEsquinas += `<li>Superior izquierda [0,0]: ${valoresEsquinas.esquina0?.valor || 'N/A'}</li>`;
      if (m > 1) {
        infoEsquinas += `<li>Superior derecha [0,${m-1}]: ${valoresEsquinas.esquina1?.valor || 'N/A'}</li>`;
      }
      if (n > 1) {
        infoEsquinas += `<li>Inferior izquierda [${n-1},0]: ${valoresEsquinas.esquina2?.valor || 'N/A'}</li>`;
      }
      if (n > 1 && m > 1) {
        infoEsquinas += `<li>Inferior derecha [${n-1},${m-1}]: ${valoresEsquinas.esquina3?.valor || 'N/A'}</li>`;
      }
    }
    infoEsquinas += '</ul>';
    
    info.innerHTML = `
      <div class="alert alert-info">
        <h5>Información de la Matriz</h5>
        <hr>
        <p><strong>Dimensiones:</strong> ${n} filas × ${m} columnas</p>
        <p><strong>Valores en esquinas:</strong></p>
        ${infoEsquinas}
        <hr>
        <h6><strong>SUMA DE ESQUINAS: ${sumaEsquinas}</strong></h6>
      </div>
    `;
    resultBox.appendChild(info);
    
    
    const matrizDiv = document.createElement('div');
    matrizDiv.innerHTML = '<h6 class="mt-4">Matriz:</h6>';
    
    const table = document.createElement('table');
    table.className = 'table table-bordered table-sm text-center';
    
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th></th>';
    for (let i = 0; i < m; i++) {
      headerRow.innerHTML += `<th>C${i}</th>`;
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    
    const tbody = document.createElement('tbody');
    matriz.forEach((fila, indexFila) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<th>F${indexFila}</th>`;
      
      fila.forEach((valor, indexCol) => {
        const td = document.createElement('td');
        td.textContent = valor;
        
        
        if (
          (indexFila === 0 && indexCol === 0) ||
          (indexFila === 0 && indexCol === m - 1 && m > 1) ||
          (indexFila === n - 1 && indexCol === 0 && n > 1) ||
          (indexFila === n - 1 && indexCol === m - 1 && n > 1 && m > 1)
        ) {
          td.className = 'bg-warning fw-bold';
        }
        
        tr.appendChild(td);
      });
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    matrizDiv.appendChild(table);
    resultBox.appendChild(matrizDiv);
  });
});

