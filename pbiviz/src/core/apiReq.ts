import { handleResponse, handleError } from "./apiResp";


export function sendRequest(data: any[]): void {
    console.log("Enviando requisição...");
    fetch(buildRequestUrl(), buildRequestOptions(data))
        .then(handleResponse)
        .catch((error) => handleError(error));
}

function buildRequestUrl(): string {
    return "https://apcbrh-powerbi-report-app.azurewebsites.net/api/bi_metricas_saude";
}

function buildRequestOptions(data: any[]): RequestInit {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filtros: data })
    };
}
