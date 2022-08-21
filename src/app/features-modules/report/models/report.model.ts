import { Chart } from "./chart.model";

export interface Report {
    tposDocumentos: Chart[];
    tposTratamentos: Chart[];
    estadosDocumentos: Chart[];
    outrosEstados: Chart[];
}

export function createTempReport(): Report {
    return {
        tposDocumentos: [],
        tposTratamentos: [],
        estadosDocumentos: [],
        outrosEstados: [],
    };
}