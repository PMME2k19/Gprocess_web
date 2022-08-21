import { BaseEntity } from "src/app/base-models/base/base-entity";
import { UserModel } from "../../user/models/user.model";

export class DetailProcessModel extends BaseEntity {
    ordem: number = 0;
    numeroProcesso: string = "";
    dataEmissaoProcesso: string = "";
    dataEntrega: string = "";
    dataRegisto: string = "";
    proveniencia: string = "";
    assunto: string = "";
    tipoTratamentoUltimoDespacho: number = 0;
    tTratamentoUltimoDespachoDescription: string = "";
    isTratamentoColcuidoUltimoDespacho: boolean = false;
    idUltimoDespacho: string = "";
    tipoProcesso: any;
    protocolo: any;
    responsavel: any;
    estadoActual: number = 0;
    nivelAcesso: number = 0;
    nivelAcessoDescription: string = "";
    estadoActualDescription: string = "";
    estados: any[] = [];
    solicitacoes: any[] = [];
    despachos: any[] = [];
    reunioes: any[] = [];
    arquivos: any[] = [];
    observacoes: any[] = [];
    utilizadoresComAcesso: any[] = [];
}
