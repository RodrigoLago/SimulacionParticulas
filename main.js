
//Se importan las funciones necesarias
import { DrawPoints, ProcessCSV, CleanCanvasAndFiles } from "./helper.js";

//Inicialización de las listas de partículas
let jsonInicio = [];
let jsonFinal = [];
let jsonMerged = []; //esta lista es la combinacion de ambas, para poder renderizarlas juntas

//Se agregan eventos a ambos inputs para que al cargar archivos automaticamente se dispare la funcion CsvUploadHandler
document.getElementById("csvFileInit").addEventListener("change", (event) => CsvUploadHandler(event, true));
document.getElementById("csvFileEnd").addEventListener("change", (event) => CsvUploadHandler(event, false));

//Evento del boton limpiar para que ejecute la funcion Clear
$("#cleanBtn").click(Clear);

//Funcion disparada al cargar un archivo
function CsvUploadHandler(event, isInicio) {
  //Lee el archivo CSV
  const file = event.target.files[0];
  const reader = new FileReader();
  //Se procesan los puntos y se dibujan
  reader.onload = function (e) {
    const text = e.target.result;
    isInicio ? jsonInicio = ProcessCSV(text, true) : jsonFinal = ProcessCSV(text, false);
    DrawPoints([...jsonInicio, ...jsonFinal]);
  };
  reader.readAsText(file);
}

//Funcion disparada al limpiar
function Clear(){
  CleanCanvasAndFiles();
  jsonInicio = jsonFinal = jsonMerged = [];
}



