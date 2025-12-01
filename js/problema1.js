document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input[type="number"]');
  
  
  const container = document.querySelector('.container');
  const resultBox = document.createElement('div');
  resultBox.className = 'mt-4';
  container.appendChild(resultBox);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    resultBox.innerHTML = ''; 
    
    
    const parciales = Array.from(inputs).map(input => Number(input.value));
    
    
    if (parciales.some(n => isNaN(n) || n === '')) {
      resultBox.innerHTML = '<div class="alert alert-danger">Por favor, completa todos los parciales.</div>';
      return;
    }
    
    
    if (parciales.some(n => n < 0 || n > 100)) {
      resultBox.innerHTML = '<div class="alert alert-danger">Las notas deben estar entre 0 y 100.</div>';
      return;
    }
    
    
    const promedioParciales = (parciales[0] + parciales[1] + parciales[2]) / 3;
    const contribucionParciales = promedioParciales * 0.6;
    
    
    const notaFinalMinima = (60 - contribucionParciales) / 0.4;
    
    
    let estado = '';
    let alertClass = 'alert-info';
    
    if (notaFinalMinima <= 0) {
      estado = 'Ya aprobaste con los parciales. Cualquier nota en el examen es válida.';
      alertClass = 'alert-success';
    } else if (notaFinalMinima > 100) {
      estado = 'Es imposible aprobar. Necesitarías más de 100 en el examen final.';
      alertClass = 'alert-danger';
    } else {
      estado = `Necesitas al menos ${notaFinalMinima.toFixed(2)} en el examen final para pasar.`;
      alertClass = 'alert-warning';
    }
    
    
    const resultado = document.createElement('div');
    resultado.innerHTML = `
      <div class="alert ${alertClass} mt-3">
        <h5>Resultados</h5>
        <hr>
        <p><strong>Parcial 1:</strong> ${parciales[0]}</p>
        <p><strong>Parcial 2:</strong> ${parciales[1]}</p>
        <p><strong>Parcial 3:</strong> ${parciales[2]}</p>
        <p><strong>Promedio parciales:</strong> ${promedioParciales.toFixed(2)}</p>
        <p><strong>Contribución de parciales (60%):</strong> ${contribucionParciales.toFixed(2)}</p>
        <hr>
        <h6><strong>${estado}</strong></h6>
        ${notaFinalMinima > 0 && notaFinalMinima <= 100 ? 
          `<p><strong>Nota mínima en examen final:</strong> ${notaFinalMinima.toFixed(2)}</p>` : 
          ''}
      </div>
    `;
    resultBox.appendChild(resultado);
    
    
    const tableDiv = document.createElement('div');
    tableDiv.innerHTML = `
      <h6 class="mt-4">Comparativa de calificaciones según nota final:</h6>
      <table class="table table-sm table-bordered">
        <thead class="table-light">
          <tr>
            <th>Calificación</th>
            <th>Umbral mínimo</th>
            <th>¿Posible con tu promedio?</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;
    
    const umbrales = { 'A': 90, 'B': 80, 'C': 70, 'D': 60, 'F': 0 };
    const tbody = tableDiv.querySelector('tbody');
    
    for (const [letra, umbral] of Object.entries(umbrales)) {
      const notaNecesaria = (umbral - contribucionParciales) / 0.4;
      let posible = '';
      
      if (letra === 'F') {
        posible = contribucionParciales < 60 ? 'Sí' : 'No';
      } else {
        if (notaNecesaria < 0) {
          posible = 'Ya alcanzado';
        } else if (notaNecesaria <= 100) {
          posible = `Necesitas ${notaNecesaria.toFixed(2)}`;
        } else {
          posible = 'Imposible';
        }
      }
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${letra}</strong></td>
        <td>${umbral}</td>
        <td>${posible}</td>
      `;
      tbody.appendChild(tr);
    }
    
    resultBox.appendChild(tableDiv);
  });
});
