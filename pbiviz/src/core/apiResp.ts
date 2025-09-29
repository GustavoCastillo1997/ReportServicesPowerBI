export function handleResponse(response: Response): Promise<void> {
  return async () => {
    if (!response.ok) {
      console.log(`Erro ao enviar: ${response.status}`);
      alert(`Erro ao enviar: ${response.status}`);
      return;
    }
    const result = await response.json();
    console.log("Requisição enviada com sucesso.");
    alert("Requisição enviada com sucesso.");
    processBackendResult(result);
  };
}

export function processBackendResult(result: any): void {
  if (result?.sasUrl) {
    console.log("Abrindo relatório...");
    window.open(result.sasUrl, "_blank");
  } else {
    console.log("Resposta recebida, mas 'sasUrl' não encontrado.");
  }
}

export function handleError(error: any): void {
  console.log(`Falha na requisição: ${error.message}`);
  alert("Falha na requisição: " + error.message);
}
