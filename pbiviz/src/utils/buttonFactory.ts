export function createButtonImage(imagemPath: string, altText: string, titleText: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = `
    <img src="${imagemPath}"
         alt="${altText}"
         title="${titleText}"
         style="height: 24px; width: 24px;" />
  `;
  button.style.cursor = "pointer";
  return button;
}
