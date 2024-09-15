let jsonInicio;

document.getElementById("csvFile").addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    jsonInicio = processCSV(text);
    console.log(jsonInicio);
    drawPoints(jsonInicio);
  };

  reader.readAsText(file);

  function processCSV(csvString) {
    //Split del CSV
    const lines = csvString.trim().split("\n");

    // Mapeo a Json
    return lines.map((line) => {
      const values = line.split(",");
      return {
        X: parseFloat(values[0]?.trim()) || "",
        Y: parseFloat(values[1]?.trim()) || "",
        Masa: parseFloat(values[2]?.trim()) || "",
      };
    });
  }

  function drawPoints(data) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuracion del estilo del punto
    
    const radius = 5;
    
    // Busco valores maximos y minimos de cada eje
    const xValues = data.map((point) => point.X);
    const yValues = data.map((point) => point.Y);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);
    const innerMargin = 100; // Margen interno para los puntos

    // Agregar marcas de graduación y etiquetas
    ctx.fillStyle = "black";
    ctx.font = "15px Poppins";

    // Marcas y etiquetas en el eje X
    const xStep = canvas.width / 10; // 10 marcas de graduación
    for (let i = 0; i <= 10; i++) {
      const x = i * xStep;
      ctx.beginPath();
      ctx.moveTo(x, canvas.height);
      ctx.lineTo(x, canvas.height - 10); // Longitud de las marcas
      ctx.stroke();
      const label = (xMin + (i * (xMax - xMin)) / 10).toFixed(1);
      ctx.fillText(label, x, canvas.height - 15); // Etiquetas
    }

    // Marcas y etiquetas en el eje Y
    const yStep = canvas.height / 10; // 10 marcas de graduación
    for (let i = 0; i <= 10; i++) {
      const y = canvas.height - i * yStep;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(10, y); // Longitud de las marcas
      ctx.stroke();
      const label = (yMin + (i * (yMax - yMin)) / 10).toFixed(1);
      ctx.fillText(label, 15, y + 4); // Etiquetas
    }

    // Escalar los puntos para ajustarlos al canvas
    data.forEach((point) => {
      const x =
        innerMargin +
        ((point.X - xMin) / (xMax - xMin)) * (canvas.width - 2 * innerMargin);
      const y =
        canvas.height -
        innerMargin -
        ((point.Y - yMin) / (yMax - yMin)) * (canvas.height - 2 * innerMargin);

      ctx.beginPath();
      ctx.arc(x, y, point.Masa, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(159, 90, 253, 0.5)"; // Color del relleno del punto
      ctx.fill();
      // Borde del punto
      ctx.strokeStyle = "rgba(90, 34, 139, 0.7)"; // Color del borde del punto
      //ctx.lineWidth = 0.1*point.Masa; // Ancho del borde
      ctx.stroke();
    });
     // Dibujar el eje X
     const grosorEjes = 1;
    ctx.fillStyle = 'black'; // Color de la línea del eje X
    ctx.fillRect(0, canvas.height - grosorEjes / 2, canvas.width, grosorEjes);

    // Dibujar el eje Y
    ctx.fillStyle = 'black'; // Color de la línea del eje Y
    ctx.fillRect(-grosorEjes / 2, 0, grosorEjes, canvas.height);
 
  }
  
});
