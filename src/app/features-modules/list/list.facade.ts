import { Injectable } from "@angular/core";
import { debounceTime, distinctUntilChanged, Observable, switchMap } from "rxjs";
import { AccessLevelEnum } from "src/app/base-enums/access-level.enum";
import { ResponseEnum } from "src/app/base-enums/response-enum";
import { PaginationData } from "src/app/base-models/base/pagination-data.model";
import { ResponseModel } from "src/app/base-models/base/ResponseModel";
import { DataAccessService } from "src/app/core/base-data-access/data-access.service";
import { SelectInput } from "src/app/shared/components/select-input/select-input.model";
import { NotificationService } from "src/app/shared/notification/notification.service";
import { environment } from "src/environments/environment";
import { ProcessModel } from "./models/process-model";
import { ProcessResumeModel } from "./models/process-resume-model";
import { ListState } from "./state/list.state";

@Injectable()
export class ListFacade {

    constructor(
        private apiService: DataAccessService,
        public listState: ListState,
        private notificationService: NotificationService
    )
    { }

    updateUriForSearch(){
        let uri: string = `Processo?PageNumber=${this.listState.paginationStateContent.pageNumber}&PageSize=${this.listState.paginationStateContent.pageSize}&NivelAcesso=${this.listState.processTypeContent}`;

        if(this.listState.termSearchContent !== ''){
            uri = uri + `&SearchString=${this.listState.termSearchContent}`;
        }

        if(this.listState.typeIdSearchContent !== ''){
            uri = uri + `&TipoDocumentoId=${this.listState.typeIdSearchContent}`;
        }

        if(this.listState.prioritySearchContent !== -1){
            uri = uri + `&Prioridade=${this.listState.prioritySearchContent}`;
        }

        if(this.listState.actualStateSearchContent !== -1){
            uri = uri + `&EstadoActual=${this.listState.actualStateSearchContent}`;
        }

        if(this.listState.dateSearchContent.length > 0){
            uri = uri + `&DataRegisto=${this.listState.dateSearchContent}`;
        }

        this.listState.uriForSearchContent = uri;

        //console.log(this.listState.uriForSearchContent);
    }

    async setProcessData(uri: string = `Processo?${environment.appPaginationBaseUri}&NivelAcesso=0`) {

       this.listState.isEmptyContent = false;

       this.listState.isLoadingProcessesContent = true;

       let resData: ResponseModel = await this.apiService.get(uri);

       if(resData.responseEnum == ResponseEnum.SUCCESS){

            //console.log(resData.data.data);

            this.updateContentAndPaginationDate(resData.data.data);

        }else{

            this.notificationService.error(resData.responseMsg);
            this.listState.isEmptyContent = true;

        }

        this.listState.isLoadingProcessesContent = false;
    }

    async getDocTypes(): Promise< SelectInput []> {
        this.listState.isLoadingTypeContent = true;

        let resDataProcesssTypes: ResponseModel = await this.apiService.get('TipoProcesso');

        if(resDataProcesssTypes.responseEnum == ResponseEnum.SUCCESS){

            this.listState.isLoadingTypeContent = false;

            return resDataProcesssTypes.data;

         }else{

            this.notificationService.error(resDataProcesssTypes.responseMsg);

            this.listState.isLoadingTypeContent = false;

            return [];
         }
    }

    listenToSearchChanges(search$: Observable<string>): void {
        search$.pipe(
          distinctUntilChanged(),
          debounceTime(400),
          switchMap(search => {
                this.listState.isEmptyContent = false;
                this.listState.isLoadingProcessesContent = true;
                this.listState.termSearchContent = search;
                this.updateUriForSearch();
                return this.apiService.get(this.listState.uriForSearchContent);
            })
        )
        .subscribe((resData: any) => {
            console.log(resData.data.data);
            this.updateContentAndPaginationDate(resData.data.data);
        });
    }

    updateContentAndPaginationDate(data: any){
        let procs: ProcessModel[] = data.rows;
        let processResume: ProcessResumeModel[] = data.resumosEstatistico;
        this.listState.processes = procs;
        this.listState.resume = processResume;

        if(procs.length == 0) this.listState.isEmptyContent = true;
        else{
            //Set pagination data
            let _paginationData = new PaginationData(data.pageNumber);
            _paginationData.totalItems = data.totalRecords;
            _paginationData.totalPages = data.totalPages;
            _paginationData.pageNumber = data.pageNumber;
            this.listState.paginationStateContent = _paginationData;
        }

        this.listState.isLoadingProcessesContent = false;
    }

    resetSearchOnDestry(){
        this.listState.processTypeContent = AccessLevelEnum.PUBLICO;
        this.listState.termSearchContent = '';
        this.listState.typeIdSearchContent = '';
        this.listState.prioritySearchContent = -1;
        this.listState.actualStateSearchContent = -1;
        this.listState.dateSearchContent = '';
        this.listState.isLoadingProcessesContent = true;
    }

    getObservableProcesses(){
        return this.listState.listFilteredProcesses$;
    }

    getObservableResume(){
        return this.listState.processResume$;
    }

    getObservableIsEmpty(){
        return this.listState.isEmptyList$;
    }

    getObservableIsLoadingType(){
        return this.listState.isLoadingType$;
    }

    getResumeValues(): ProcessResumeModel[] {
        return this.listState.resume;
    }

    getIsEmptyValue(): boolean {
        return this.listState.isEmptyContent;
    }

}
