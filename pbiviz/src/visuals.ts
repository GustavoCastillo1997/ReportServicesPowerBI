import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

import { createButton } from "./core/ui";
import { extractAppliedFilters } from "./core/dataHandler";
import { sendRequest } from "./core/apiReq";
import { buildRequestOptions } from "./core/apiReq";

export class Visual implements IVisual {
    private button: HTMLButtonElement;
    private options: VisualConstructorOptions;
    private appliedFilters: any[] = [];

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
        console.log("Relatório solicitado! Enviando filtros...");
        console.log("Filtros aplicados no momento do clique:", this.appliedFilters);

        if (this.appliedFilters.length > 0) {
            console.log("Filtros a serem enviados:", this.appliedFilters);
            const requestOptions = buildRequestOptions(this.appliedFilters);
            sendRequest(requestOptions);
        }
        else {
            console.log("Nenhum filtro aplicado.");
        }
    }

    public update(options: VisualUpdateOptions): void {
        console.log("Atualizando filtros aplicados...");
        this.button.disabled = false;

        const dataView = options.dataViews?.[0];
        if (dataView) {
            const filters = dataView.metadata?.objects?.filters
                ? Object.values(dataView.metadata.objects.filters)
                : [];

            this.appliedFilters = extractAppliedFilters(filters);
            console.log("Filtros extraídos:", this.appliedFilters);
        }
    }
}
