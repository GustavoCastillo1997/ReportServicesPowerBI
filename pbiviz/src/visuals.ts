import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

import { extractData } from "./core/dataHandler";
import { sendRequest } from "./core/apiReq";
import { log } from "./core/logger";

export class Visual implements IVisual {
  private button: HTMLButtonElement;
  private logDiv: HTMLDivElement;
  private data: any[] = [];

  constructor(options: VisualConstructorOptions) {
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";

    this.button = document.createElement("button");
    this.button.textContent = "Gerar Relatório";
    this.button.disabled = true;
    this.button.style.margin = "10px 0";
    this.button.style.padding = "6px 14px";
    this.button.style.fontSize = "14px";

    this.button.onclick = () => sendRequest(this.data, this.logDiv);

    this.logDiv = document.createElement("div");
    this.logDiv.style.width = "90%";
    this.logDiv.style.height = "150px";
    this.logDiv.style.overflowY = "auto";
    this.logDiv.style.border = "1px solid #ccc";
    this.logDiv.style.padding = "8px";
    this.logDiv.style.fontSize = "12px";
    this.logDiv.style.fontFamily = "monospace";
    this.logDiv.style.backgroundColor = "#f9f9f9";
    this.logDiv.style.whiteSpace = "pre-wrap";
    this.logDiv.style.marginTop = "10px";

    container.appendChild(this.button);
    container.appendChild(this.logDiv);
    options.element.appendChild(container);
  }

  public update(options: VisualUpdateOptions): void {
    const dataView = options.dataViews?.[0];
    this.data = extractData(dataView, (msg) => log(this.logDiv, msg));

    log(this.logDiv, `Dados carregados: ${this.data.length} linha(s).`);
    this.button.disabled = this.data.length === 0;
  }
}
