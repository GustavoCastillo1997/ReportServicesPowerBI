import { handleResponse, handleError } from "./apiResp";
import { log } from "./logger";

export function sendRequest(data: any[], logDiv: HTMLDivElement): void {
  log(logDiv, "Enviando dados para backend...");

  fetch("https://apcbrh-powerbi-report-app.azurewebsites.net/api/bi_castrolanda_single", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filtros: data })
  })
    .then(res => handleResponse(logDiv)(res))
    .catch(err => handleError(err, logDiv));
}
