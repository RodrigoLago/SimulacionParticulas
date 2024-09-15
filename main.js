let jsonInicio;

document.getElementById('csvFile').addEventListener('change', event => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const text = e.target.result;
      jsonInicio = processCSV(text);
      console.log(jsonInicio);
      drawPoints(jsonInicio);
    };
  
    reader.readAsText(file);
  

function processCSV(csvString) {
    //Split del CSV
    const lines = csvString.trim().split('\n');
    
    // Mapeo a Json
    return lines.map(line => {
        const values = line.split(',');
        return {
        X: parseFloat(values[0]?.trim()) || '',
        Y: parseFloat(values[1]?.trim())  || '',
        Masa: parseFloat(values[2]?.trim()) || ''
        };
    });
    }
    
    function drawPoints(data) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configuración del estilo de los puntos
    ctx.fillStyle = 'blue';
    const radius = 5;
    
    // Encontrar los valores máximos y mínimos para normalizar los puntos
    const xValues = data.map(point => point.X);
    const yValues = data.map(point => point.Y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    
    // Escalar los puntos para ajustarlos al canvas
    data.forEach(point => {
        const x = ((point.X - xMin) / (xMax - xMin)) * canvas.width;
        const y = canvas.height - (((point.Y - yMin) / (yMax - yMin)) * canvas.height);
        
        ctx.beginPath();
        ctx.arc(x, y, point.Masa, 0, 2 * Math.PI);
        ctx.fill();
    });
    }
});
  

