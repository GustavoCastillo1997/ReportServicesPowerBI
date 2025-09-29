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
