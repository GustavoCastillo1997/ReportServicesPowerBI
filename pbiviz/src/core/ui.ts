export function createButton(onClick: () => void): HTMLButtonElement{
  const button = document.createElement("button");
  button.textContent = "Gerar Relatório";
  button.disabled = true;
  button.style.margin = "10px 0";
  button.style.padding = "6px 14px";
  button.style.fontSize = "14px";
  button.onclick = onClick;
  return button;
}

export function createLogDiv(): HTMLDivElement{
  const logDiv = document.createElement("div");
  logDiv.style.width = "90%";
  logDiv.style.height = "150px";
  logDiv.style.overflowY = "auto";
  logDiv.style.border = "1px solid #ccc";
  logDiv.style.padding = "8px";
  logDiv.style.fontSize = "12px";
  logDiv.style.fontFamily = "monospace";
  logDiv.style.backgroundColor = "#f9f9f9";
  logDiv.style.whiteSpace = "pre-wrap";
  logDiv.style.marginTop = "10px";
  return logDiv;
}

export function log(logDiv: HTMLDivElement, message: string): void {
  const time = new Date().toLocaleTimeString();
  logDiv.textContent += `[${time}] ${message}\n`;
  logDiv.scrollTop = logDiv.scrollHeight;
}
