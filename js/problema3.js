document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input[type="number"]');
  const numero1Input = inputs[0];
  const numero2Input = inputs[1];
  
  
  const container = document.querySelector('.container');
  const resultBox = document.createElement('div');
  resultBox.className = 'mt-4';
  container.appendChild(resultBox);
  
  
  function todasCifrasPares(numero) {
    const cifras = Math.abs(numero).toString();
    return cifras.split('').every(cifra => {
      const digito = parseInt(cifra);
      return digito % 2 === 0;
    });
  }
  
  
  function todasCifrasImpares(numero) {
    const cifras = Math.abs(numero).toString();
    return cifras.split('').every(cifra => {
      const digito = parseInt(cifra);
      return digito % 2 !== 0;
    });
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    resultBox.innerHTML = ''; 
    
    const numero1 = Number(numero1Input.value);
    const numero2 = Number(numero2Input.value);
    
   
    if (numero1Input.value === '' || numero2Input.value === '') {
      resultBox.innerHTML = '<div class="alert alert-danger">Por favor, completa ambos números.</div>';
      return;
    }
    
    
    if (isNaN(numero1) || isNaN(numero2)) {
      resultBox.innerHTML = '<div class="alert alert-danger">Ingresa números válidos.</div>';
      return;
    }
    
    
    const numero1EsPar = todasCifrasPares(numero1);
    const numero2EsImpar = todasCifrasImpares(numero2);
    
    
    const resultado = document.createElement('div');
    resultado.innerHTML = `
      <div class="card mt-3">
        <div class="card-header bg-primary text-white">
          <h5>Análisis de Números</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <h6><strong>Número 1: ${numero1}</strong></h6>
              <p><strong>Cifras:</strong> ${Math.abs(numero1).toString().split('').join(', ')}</p>
              <p><strong>¿Todas pares?</strong> 
                <span class="badge ${numero1EsPar ? 'bg-success' : 'bg-danger'}">
                  ${numero1EsPar ? 'SÍ' : 'NO'}
                </span>
              </p>
            </div>
            <div class="col-md-6">
              <h6><strong>Número 2: ${numero2}</strong></h6>
              <p><strong>Cifras:</strong> ${Math.abs(numero2).toString().split('').join(', ')}</p>
              <p><strong>¿Todas impares?</strong> 
                <span class="badge ${numero2EsImpar ? 'bg-success' : 'bg-danger'}">
                  ${numero2EsImpar ? 'SÍ' : 'NO'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    resultBox.appendChild(resultado);
    
    
    const mensaje = document.createElement('div');
    const mensajeTexto = numero1EsPar && numero2EsImpar 
      ? '¡Excelente! Ambas condiciones se cumplen.'
      : 'Las condiciones no se cumplen completamente.';
    
    const alertClass = numero1EsPar && numero2EsImpar ? 'alert-success' : 'alert-warning';
    
    mensaje.innerHTML = `
      <div class="alert ${alertClass} mt-3" role="alert">
        <h6><strong>${mensajeTexto}</strong></h6>
        <ul class="mb-0 mt-2">
          <li>Número 1 (${numero1}) tiene todas cifras pares: <strong>${numero1EsPar ? 'SÍ' : 'NO'}</strong></li>
          <li>Número 2 (${numero2}) tiene todas cifras impares: <strong>${numero2EsImpar ? 'SÍ' : 'NO'}</strong></li>
        </ul>
      </div>
    `;
    resultBox.appendChild(mensaje);
    
    
    const tabla = document.createElement('div');
    tabla.innerHTML = '<h6 class="mt-4"><strong>Detalle de Cifras:</strong></h6>';
    
    const table = document.createElement('table');
    table.className = 'table table-sm table-bordered';
    table.innerHTML = `
      <thead class="table-light">
        <tr>
          <th>Número</th>
          <th>Cifra</th>
          <th>Par</th>
          <th>Impar</th>
        </tr>
      </thead>
      <tbody>
    `;
    
    
    const cifras1 = Math.abs(numero1).toString().split('');
    cifras1.forEach(cifra => {
      const digito = parseInt(cifra);
      const esPar = digito % 2 === 0;
      const esImpar = digito % 2 !== 0;
      table.innerHTML += `
        <tr>
          <td rowspan="${cifras1.length === 1 ? 1 : 'auto'}"><strong>${numero1}</strong></td>
          <td>${cifra}</td>
          <td>${esPar ? '✓' : '–'}</td>
          <td>${esImpar ? '✓' : '–'}</td>
        </tr>
      `;
    });
    
    
    const cifras2 = Math.abs(numero2).toString().split('');
    cifras2.forEach(cifra => {
      const digito = parseInt(cifra);
      const esPar = digito % 2 === 0;
      const esImpar = digito % 2 !== 0;
      table.innerHTML += `
        <tr>
          <td rowspan="${cifras2.length === 1 ? 1 : 'auto'}"><strong>${numero2}</strong></td>
          <td>${cifra}</td>
          <td>${esPar ? '✓' : '–'}</td>
          <td>${esImpar ? '✓' : '–'}</td>
        </tr>
      `;
    });
    
    table.innerHTML += '</tbody></table>';
    tabla.appendChild(table);
    resultBox.appendChild(tabla);
  });
});
