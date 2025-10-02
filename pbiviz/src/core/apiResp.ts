import { log } from "./logger";

export function handleResponse(logDiv: HTMLDivElement): (res: Response) => Promise<void> {
  return async (response: Response) => {
    if (!response.ok) {
      log(logDiv, `Erro ao enviar: ${response.status}`);
      alert(`Erro ao enviar: ${response.status}`);
      return;
    }

    const result = await response.json();
    log(logDiv, "Requisição enviada com sucesso.");
    alert("Requisição enviada com sucesso.");

    processBackendResult(result, logDiv);
  };
}

export function processBackendResult(result: any, logDiv: HTMLDivElement): void {
  if (result?.sasUrl) {
    log(logDiv, "Abrindo relatório...");
    window.open(result.sasUrl, "_blank");
  } else {
    log(logDiv, "Resposta recebida, mas 'sasUrl' não encontrado.");
  }
}

export function handleError(error: any, logDiv: HTMLDivElement): void {
  log(logDiv, `Falha na requisição: ${error.message}`);
  alert("Falha na requisição: " + error.message);
}
