export function disableButton(button: HTMLButtonElement, title: string): void {
  button.disabled = true;
  button.title = title;
}

export function enableButton(button: HTMLButtonElement): void {
  button.disabled = false;
  button.title = "";
}

export function setButtonConfig(
  button: HTMLButtonElement,
  dados: any[],
  endpoint: string,
  sendData: (endpoint: string, dados: any[]) => void
): void {
  if (!dados.length) {
    disableButton(button, "Sem dados disponíveis");
    return;
  }

  enableButton(button);
  button.onclick = () => sendData(endpoint, dados);
}
