import { BaseEntity } from "src/app/base-models/base/base-entity";

export class ProcessModel extends BaseEntity {
    assunto: string = "";
    dataRegisto: string = "";
    estadoActual: string = "";
    nivelAcesso: string = "";
    numeroProcesso: string = "";
    numeroInterno: string = "";
    prioridade: string = "";
    proveniencia: string = "";
    tipoProcesso: string = "";
    isAtrasado: boolean = false;
}
