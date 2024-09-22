
import { MergeJson, DrawPoints, ProcessCSV, CleanCanvas } from "./helper.js";
let jsonInicio = [];
let jsonFinal = [];
let jsonMerged = [];

document.getElementById("csvFileInit").addEventListener("change", (event) => CsvUploadHandler(event, true));
document.getElementById("csvFileEnd").addEventListener("change", (event) => CsvUploadHandler(event, false));

$("#cleanBtn").click(Clear);

function CsvUploadHandler(event, isInicio) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    isInicio ? jsonInicio = ProcessCSV(text, true) : jsonFinal = ProcessCSV(text, false);
    DrawPoints([...jsonInicio, ...jsonFinal]);
  };

  reader.readAsText(file);
}

function Clear(){
  CleanCanvas();
  jsonInicio = jsonFinal = jsonMerged = [];
}



