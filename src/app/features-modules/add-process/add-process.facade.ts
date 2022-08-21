import { Injectable } from "@angular/core";
import { ResponseEnum } from "src/app/base-enums/response-enum";
import { ResponseModel } from "src/app/base-models/base/ResponseModel";
import { DataAccessService } from "src/app/core/base-data-access/data-access.service";
import { SelectInput } from "src/app/shared/components/select-input/select-input.model";
import { SelectUser } from "src/app/shared/components/select-user/select-user.model";
import { NotificationService } from "src/app/shared/notification/notification.service";
import { NewProcessModel } from "./models/new-process.model";
import { AddProcessState } from "./state/add-process.state";

@Injectable()
export class AddProcessFacade {

    constructor(
        private apiService: DataAccessService,
        private addProcessState: AddProcessState,
        private notificationService: NotificationService
    )
    { }

    async getUsersList(): Promise<SelectUser[]> {
        this.addProcessState.isLoadingUsersContent = true;

        let resData: ResponseModel = await this.apiService.get(`Utilizador/utilizadores-sem-filtro`);
        
        if(resData.responseEnum == ResponseEnum.SUCCESS){
            let users: SelectUser[] = resData.data.data;
            this.addProcessState.users = users;
            this.addProcessState.isLoadingUsersContent = false;
            return users;
        }else{
            this.notificationService.error(resData.responseMsg);
            this.addProcessState.isLoadingUsersContent = false;
            return [];
        }
    }

    async getDocTypes(): Promise<SelectInput[]> {    
        this.addProcessState.isLoadingTypesContent = true;   
        
        let resData: ResponseModel = await this.apiService.get('TipoProcesso');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            let types: SelectInput[] = resData.data;
            this.addProcessState.processTypes = types;
            this.addProcessState.isLoadingTypesContent = false;
            return types;
         }
         else{
            this.notificationService.error(resData.responseMsg);
            this.addProcessState.isLoadingTypesContent = false;
            return [];    
         }
    }

    async createProcess(newProcess: NewProcessModel){
        this.addProcessState.isLoadingContent = true;

        let resData: ResponseModel = await this.apiService.addUpdate(newProcess, 'Processo');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Processo adicionado!');
            this.addProcessState.isLoadingContent = false;
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            this.addProcessState.isLoadingContent = false;
            return false;
        }
    }

    getObservableUsers(){
        return this.addProcessState.usersList$;
    }

    getObservableIsLoadingTypes(){
        return this.addProcessState.isLoadingTypes$;
    }

    getObservableIsLoadingUsers(){
        return this.addProcessState.isLoadingUsers$;
    }

    getObservableIsLoading(){
        return this.addProcessState.isLoading$;
    }

    getObservableIsEmpty(){
        return this.addProcessState.isEmptyList$;
    }

}
