import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

import { createButton, createLogDiv, log } from "./core/ui";
import { extractTableData } from "./core/dataHandler";
import { sendRequest } from "./core/apiReq";


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

    this.logDiv = createLogDiv();
    this.button = createButton(() => sendRequest(this.data, this.logDiv));

    container.appendChild(this.button);
    container.appendChild(this.logDiv);
    options.element.appendChild(container);
  }

  public update(options: VisualUpdateOptions): void {
    const dataView = options.dataViews?.[0];
    log(this.logDiv, `DataView recebido? ${dataView ? "Sim" : "Não"}`);
    if (dataView?.table) {
      log(this.logDiv, "Tipo detectado: TABLE");
    } else if (dataView?.categorical) {
      log(this.logDiv, "Tipo detectado: CATEGORICAL");
    } else if (dataView?.matrix) {
      log(this.logDiv, "Tipo detectado: MATRIX");
    } else {
      log(this.logDiv, "Tipo de DataView desconhecido ou vazio");
    }
    this.data = extractTableData(dataView);
    log(this.logDiv, `Dados carregados: ${this.data.length} linha(s).`);
    this.button.disabled = this.data.length === 0;
  }
}
