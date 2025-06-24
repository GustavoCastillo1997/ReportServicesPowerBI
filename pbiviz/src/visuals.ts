import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

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

    this.button.onclick = () => this.sendRequest();

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

  private log(message: string) {
    const time = new Date().toLocaleTimeString();
    this.logDiv.textContent += `[${time}] ${message}\n`;
    this.logDiv.scrollTop = this.logDiv.scrollHeight;
  }

  public update(options: VisualUpdateOptions): void {
    const dataView = options.dataViews?.[0];

    this.log(`DataView recebido? ${dataView ? "Sim" : "Não"}`);

    if (dataView?.table) {
      this.log("Tipo detectado: TABLE");
    } else if (dataView?.categorical) {
      this.log("Tipo detectado: CATEGORICAL");
    } else if (dataView?.matrix) {
      this.log("Tipo detectado: MATRIX");
    } else {
      this.log("Tipo de dataView desconhecido ou vazio");
    }

    const table = dataView?.table;

    if (!table || !table.rows || !table.columns) {
      this.log("Dados de tabela incompletos ou ausentes. Botão desabilitado.");
      this.button.disabled = true;
      return;
    }

    const columns = table.columns.map(col => col.displayName);
    this.data = table.rows.map(row => {
      const obj: { [key: string]: any } = {};
      row.forEach((value, index) => {
        obj[columns[index]] = value;
      });
      return obj;
    });

    this.log(`Dados carregados: ${this.data.length} linhas.`);
    this.button.disabled = this.data.length === 0;
  }

  private sendRequest(): void {
    console.log("Enviando dados...:", this.data);
    fetch("https://apcbrh-powerbi-report-app.azurewebsites.net/api/bi_castrolanda_single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filtros: this.data })
    })
      .then(response => {
        if (response.ok) {
          alert("Requisição enviada com sucesso.");
          this.log("Requisição enviada com sucesso.");
        } else {
          alert(`Erro ao enviar: ${response.status}`);
          this.log(`Erro ao enviar: ${response.status}`);
        }
      })
      .catch(error => {
        alert("Falha na requisição: " + error.message);
        this.log(`Falha na requisição: ${error.message}`);
      });
  }
}
