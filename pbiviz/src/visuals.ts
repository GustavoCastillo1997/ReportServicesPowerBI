import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export class Visual implements IVisual {
  private button: HTMLButtonElement;
  private data: any[] = [];

  constructor(options: VisualConstructorOptions) {
    const image = document.createElement("img");
    image.src = "assets/icon.png";
    image.alt = "Ícone do botão";
    image.style.width = "40px";
    image.style.height = "40px";
    image.style.display = "block";
    image.style.marginBottom = "10px";

    this.button = document.createElement("button");
    this.button.textContent = "Enviar Filtros";
    this.button.disabled = true;
    this.button.style.margin = "10px 0";
    this.button.style.padding = "6px 14px";
    this.button.style.fontSize = "14px";

    this.button.onclick = () => this.sendRequest();

    options.element.appendChild(image);
    options.element.appendChild(this.button);
  }

  public update(options: VisualUpdateOptions): void {
    const dataView = options.dataViews?.[0]?.table;
    if (!dataView || !dataView.rows || !dataView.columns) {
      this.button.disabled = true;
      return;
    }

    const columns = dataView.columns.map(col => col.displayName);
    this.data = dataView.rows.map(row => {
      const obj: { [key: string]: any } = {};
      row.forEach((value, index) => {
        obj[columns[index]] = value;
      });
      return obj;
    });

    this.button.disabled = this.data.length === 0;
  }

  private sendRequest(): void {
    fetch("https://apcbrh-powerbi-report-app.azurewebsites.net/api/bi_castrolanda_single", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filtros: this.data })
    })
      .then(response => {
        if (response.ok) {
          alert("✅ Enviado com sucesso!");
        } else {
          alert(`⚠️ Erro ao enviar: ${response.status}`);
        }
      })
      .catch(error => {
        alert("❌ Falha na requisição: " + error.message);
      });
  }
}
