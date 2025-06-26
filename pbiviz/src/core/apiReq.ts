import { log } from "./ui";
import { handleResponse, handleError } from "./apiResp";


export function sendRequest(data: any[], logDiv: HTMLDivElement): void {
  log(logDiv, "Enviando requisição...");
  fetch(buildRequestUrl(), buildRequestOptions(data))
    .then(handleResponse(logDiv))
    .catch((error) => handleError(error, logDiv));
}

function buildRequestUrl(): string {
  return "https://apcbrh-powerbi-report-app.azurewebsites.net/api/bi_castrolanda_single";
}

function buildRequestOptions(data: any[]): RequestInit {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filtros: data })
  };
}
