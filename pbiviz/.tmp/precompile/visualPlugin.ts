import { Visual } from "../../src/visuals";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;

var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var d9f4a2c8-8f3e-4f7b-9a1b-2e5c7d8f9b0a: IVisualPlugin = {
    name: 'd9f4a2c8-8f3e-4f7b-9a1b-2e5c7d8f9b0a',
    displayName: 'Gerar Relatório',
    class: 'Visual',
    apiVersion: '3.4.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["d9f4a2c8-8f3e-4f7b-9a1b-2e5c7d8f9b0a"] = d9f4a2c8-8f3e-4f7b-9a1b-2e5c7d8f9b0a;
}
export default d9f4a2c8-8f3e-4f7b-9a1b-2e5c7d8f9b0a;