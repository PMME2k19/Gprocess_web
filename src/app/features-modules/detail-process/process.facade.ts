import { Injectable } from "@angular/core";
import { ResponseEnum } from "src/app/base-enums/response-enum";
import { ResponseModel } from "src/app/base-models/base/ResponseModel";
import { DataAccessService } from "src/app/core/base-data-access/data-access.service";
import { SelectUser } from "src/app/shared/components/select-user/select-user.model";
import { NotificationService } from "src/app/shared/notification/notification.service";
import { DetailProcessModel } from "./models/detail-process.model";
import { ProcessState } from "./state/process.state";

@Injectable()
export class ProcessFacade {

    constructor(
        private apiService: DataAccessService,
        private processState: ProcessState,
        private notificationService: NotificationService
    )
    { }

    private validateResult(resData: ResponseModel){
        if(resData.responseEnum == ResponseEnum.SUCCESS){
            let process: DetailProcessModel = resData.data.data;
            this.processState.process = process;
            this.processState.isEmptyContent = false;
        }else{
            this.notificationService.error(resData.responseMsg);
            this.processState.isEmptyContent = true;
        }

        this.processState.isLoadingContent = false;
    }

    async getProcessData(id: string) {
        this.processState.isEmptyContent = false;
        this.processState.isLoadingContent = true;

        let resData: ResponseModel = await this.apiService.get(`Processo/${id}`);
        this.validateResult(resData);
    }

    async solicitarDespacho (solicitacao: any) {
        let resData: ResponseModel = await this.apiService.addUpdate(solicitacao, 'Processo/solicitardespacho');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Despacho Solicitado!');
            this.getProcessData(solicitacao.processoId);
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            return false;
        }
    }

    async darDespacho (despacho: any) {
        let resData: ResponseModel = await this.apiService.addUpdate(despacho, 'Processo/Despachar');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Despacho Realizado!');
            this.getProcessData(despacho.processoId);
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            return false;
        }
    }

    async darTratamento (tratamento: any) {
        let resData: ResponseModel = await this.apiService.addUpdate(tratamento, 'Processo/DarTratamento');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Tratamento Realizado!');
            this.getProcessData(tratamento.processoId);
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            return false;
        }
    }

    async passarParaAnalise (analise: any) {
      let resData: ResponseModel = await this.apiService.addUpdate(analise, 'Processo/PassarParaAnalise');

      if(resData.responseEnum == ResponseEnum.SUCCESS){
          this.notificationService.success('Processo passado para análise!');
          this.getProcessData(analise.processoId);
          return true;
      }
      else{
          this.notificationService.error(resData.responseMsg);
          return false;
      }
    }

    async arquivarProcesso (arquivar: any) {
      let resData: ResponseModel = await this.apiService.addUpdate(arquivar, 'Processo/Arquivar');

      if(resData.responseEnum == ResponseEnum.SUCCESS){
          this.notificationService.success('Processo arquivado!');
          this.getProcessData(arquivar.processoId);
          return true;
      }
      else{
          this.notificationService.error(resData.responseMsg);
          return false;
      }
    }

    async adicionarObservacao (observacao: any) {
      let resData: ResponseModel = await this.apiService.addUpdate(observacao, 'Processo/adicionarObservacao');

      if(resData.responseEnum == ResponseEnum.SUCCESS){
          this.notificationService.success('Observação adicionada!');
          this.getProcessData(observacao.processoId);
          return true;
      }
      else{
          this.notificationService.error(resData.responseMsg);
          return false;
      }
    }

    async marcarReuniao (reuniao: any) {
      let resData: ResponseModel = await this.apiService.addUpdate(reuniao, 'Processo/addreuniao');

      if(resData.responseEnum == ResponseEnum.SUCCESS){
          this.notificationService.success('Reunião marcada!');
          this.getProcessData(reuniao.processoId);
          return true;
      }
      else{
          this.notificationService.error(resData.responseMsg);
          return false;
      }
    }

    async addArquivo (processoId: string, file: FormData) {
      let resData: ResponseModel = await this.apiService.addUpdate(file, `Processo/${processoId}/addarquivo`);

      if(resData.responseEnum == ResponseEnum.SUCCESS){
          this.notificationService.success('Arquivo adicionado!');
          this.getProcessData(processoId);
          return true;
      }
      else{
          this.notificationService.error(resData.responseMsg);
          return false;
      }
    }

    async downloadArquivo (arquivoId: string) {
      let resData: ResponseModel = await this.apiService.download(`Processo/downloadfile/${arquivoId}`);

      if(resData.responseEnum == ResponseEnum.SUCCESS){
          return resData.data;
      }
      else{
          this.notificationService.error(resData.responseMsg);
          return false;
      }
    }

    async removeAcess (dataAcess: any) {
        let resData: ResponseModel = await this.apiService.addUpdate(dataAcess, 'Processo/removeracessoprivado');
  
        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Acesso removido!');
            this.getProcessData(dataAcess.processoId);
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            return false;
        }
    }

    async AddUserAcess (dataAcess: any) {
        let resData: ResponseModel = await this.apiService.addUpdate(dataAcess, 'Processo/daracessoprivado');
  
        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Utilizadores adicionados a lista de acessos!');
            this.getProcessData(dataAcess.processoId);
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            return false;
        }
    }

    async getUsersList(): Promise<SelectUser[]> {
        this.processState.isLoadingUsersContent = true;

        let resData: ResponseModel = await this.apiService.get(`Utilizador/utilizadores-sem-filtro`);
        
        if(resData.responseEnum == ResponseEnum.SUCCESS){
            let users: SelectUser[] = resData.data.data;
            this.processState.users = users;
            this.processState.isLoadingUsersContent = false;
            return users;
        }else{
            this.notificationService.error(resData.responseMsg);
            this.processState.isLoadingUsersContent = false;
            return [];
        }
    }

    getUltimoDespacho() {
        const idUltimoDespacho = this.processState.process.idUltimoDespacho;
        return this.processState.process.despachos.filter(x => x.id == idUltimoDespacho)[0];
    }

    getObservableProcess(){
        return this.processState.detailProcess$;
    }

    getObservableIsLoading(){
        return this.processState.isLoading$;
    }

    getObservableIsLoadingUsers(){
        return this.processState.isLoadingUsers$;
    }

    getObservableIsEmpty(){
        return this.processState.isEmptyList$;
    }

}
