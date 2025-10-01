import { handleResponse, handleError } from "./apiResp";


export function sendRequest(requestOptions: RequestInit): void {
    console.log("Enviando requisição...");
    fetch(buildRequestUrl(), requestOptions)
        .then(handleResponse)
        .catch((error) => handleError(error));
}

function buildRequestUrl(): string {
    return "/api/bi_metricas_saude";
}

export function buildRequestOptions(data: any[]): RequestInit {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filtros: data })
    };
}
