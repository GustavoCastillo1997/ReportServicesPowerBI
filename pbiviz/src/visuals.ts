import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

import { createButton, createLogDiv, log } from "./core/ui";
import { extractAppliedFilters } from "./core/dataHandler";
import { sendRequest } from "./core/apiReq";
import { buildRequestOptions } from "./core/apiReq";

export class Visual implements IVisual {
    private button: HTMLButtonElement;
    private options: VisualConstructorOptions;

    constructor(options: VisualConstructorOptions) {
        this.options = options;

        const container = document.createElement("div");
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.justifyContent = "center";

        this.button = createButton(() => this.handleButtonClick());

        container.appendChild(this.button);
        options.element.appendChild(container);
    }

  private handleButtonClick(): void {
    const dataView = this.options.dataViews?.[0];
    if (dataView) {
      const filters = extractAppliedFilters(dataView.filters || []);
      const requestOptions = buildRequestOptions(filters);
      sendRequest(requestOptions);
    }
  }

  public update(options: VisualUpdateOptions): void {
    const dataView = options.dataViews?.[0];
    this.button.disabled = !dataView?.filters || dataView.filters.length === 0;
  }
}
