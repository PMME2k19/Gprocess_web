import { Injectable } from "@angular/core";
import { debounceTime, distinctUntilChanged, Observable, switchMap } from "rxjs";
import { ContentMessageEnum } from "src/app/base-enums/content-message.enum";
import { ResponseEnum } from "src/app/base-enums/response-enum";
import { PaginationData } from "src/app/base-models/base/pagination-data.model";
import { ResponseModel } from "src/app/base-models/base/ResponseModel";
import { DataAccessService } from "src/app/core/base-data-access/data-access.service";
import { NotificationService } from "src/app/shared/notification/notification.service";
import { UserModel } from "../models/user.model";
import { RecycleState } from "../state/recycle.state";

@Injectable()
export class RecycleFacade {

    constructor(
        private apiService: DataAccessService,
        private recycleState: RecycleState,
        private notificationService: NotificationService
    )
    { }

    updateUriForSearch(){
      this.recycleState.isLoadingContent = true;
      this.recycleState.isEmptyContent = false;
      this.recycleState.messageTypeContent = ContentMessageEnum.EMPTY;

      let uri: string = `Utilizador/eliminados?PageNumber=${this.recycleState.paginationStateContent.pageNumber}&PageSize=${this.recycleState.paginationStateContent.pageSize}`;

      if(this.recycleState.termSearchContent !== ''){
          uri = uri + `&searchstring=${this.recycleState.termSearchContent}`;
          this.recycleState.messageTypeContent = ContentMessageEnum.SEARCH;
      }

      this.recycleState.uriForSearchContent = uri;
    }

    private validateResult(resData: ResponseModel){
        if(resData.responseEnum == ResponseEnum.SUCCESS){
            let users: UserModel[] = resData.data.data.rows;
            this.recycleState.users = users;
            this.setPaginationData(resData.data.data);

            if(users.length == 0) this.recycleState.isEmptyContent = true;

        }else{
            this.notificationService.error(resData.responseMsg);
            this.recycleState.isEmptyContent = true;
        }

        this.recycleState.isLoadingContent = false;
    }

    private setPaginationData(data: any){
        let _paginationData = new PaginationData(data.pageNumber);
        _paginationData.totalItems = data.totalRecords;
        _paginationData.totalPages = data.totalPages;
        _paginationData.pageNumber = data.pageNumber;
        this.recycleState.paginationStateContent = _paginationData;
    }

    async listUsersData() {
        this.updateUriForSearch();
        let resData: ResponseModel = await this.apiService.get(this.recycleState.uriForSearchContent);
        this.validateResult(resData);
    }

    async changePageNumber(pageNumber: number){
      this.recycleState.paginationStateContent.pageNumber = pageNumber;
      this.updateUriForSearch();
      let resData: ResponseModel = await this.apiService.get(this.recycleState.uriForSearchContent);
      this.validateResult(resData);
    }

    listenToSearchChanges(search$: Observable<string>): void {
        search$.pipe(
          distinctUntilChanged(),
          debounceTime(400),
          switchMap(search => {
                this.recycleState.termSearchContent = search;
                this.updateUriForSearch();
                return this.apiService.get(this.recycleState.uriForSearchContent);
            })
        )
        .subscribe((resData: any) => {
            this.validateResult(resData);
        });
    }

    async restoreUser(id: string) {
        const user = this.recycleState.getById(id);
        this.recycleState.removeUser(id);

        let resData: ResponseModel = await this.apiService.addUpdate({id}, 'Utilizador/restaurar');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Utilizador restaurado!');
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            this.recycleState.addUser(user);
            return false;
        }
    }

    resetSearchOnDestry(){
        if (this.recycleState.termSearchContent != ''){

            this.recycleState.termSearchContent = '';
            this.recycleState.isEmptyContent = true;
        }
    }

    getObservableUsers(){
        return this.recycleState.listUsers$;
    }

    getObservableIsLoading(){
        return this.recycleState.isLoading$;
    }

    getObservableIsEmpty(){
        return this.recycleState.isEmptyList$;
    }

    getObservableMessageType(){
        return this.recycleState.messageType$;
    }

    getObservablePagination(){
        return this.recycleState.paginationState$;
    }

}
