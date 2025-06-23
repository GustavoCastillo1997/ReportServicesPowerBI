"use strict";

import "core-js/stable";
import * as powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import { disableButton, enableButton, setButtonConfig } from "./utils/buttonUtils";
import { createButtonImage } from "./utils/buttonFactory";
import { extractData } from "./utils/dataUtils";

export class Visual implements powerbi.extensibility.visual.IVisual {
  private target: HTMLElement;
  private button: HTMLButtonElement;

  constructor(options: VisualConstructorOptions) {
    this.target = options.element;
    this.button = createButtonImage("assets/excel.png", "Gerar Relatório", "Gerar Relatório");
    this.target.appendChild(this.button);
  }

  public update(options: VisualUpdateOptions) {
    const dataView = options.dataViews && options.dataViews[0];
    const data = extractData(dataView);
    const endpoint = "https://apcbrh-powerbi-report-app.azurewebsites.net/api/bi_castrolanda_single";

    setButtonConfig(this.button, data, endpoint, this.sendData.bind(this));
  }

  private sendData(endpoint: string, data: any[]) {
    const payload = {
      origin: "PowerBI",
      timestamp: new Date().toISOString(),
      filteredData: data,
    };

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then(data => {
      if (data.sasLink) {
        window.open(data.sasLink, "_blank");
        alert("Relatório solicitado e download iniciado!");
      } else {
        alert("Erro: link para download não recebido.");
      }
    })
    .catch(err => {
      console.error("Erro na requisição:", err);
      alert("Erro técnico ao enviar os dados.");
    });
  }
}
