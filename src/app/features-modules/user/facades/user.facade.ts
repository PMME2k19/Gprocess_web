import { Injectable } from "@angular/core";
import { debounceTime, distinctUntilChanged, Observable, switchMap } from "rxjs";
import { ResponseEnum } from "src/app/base-enums/response-enum";
import { PaginationData } from "src/app/base-models/base/pagination-data.model";
import { ResponseModel } from "src/app/base-models/base/ResponseModel";
import { DataAccessService } from "src/app/core/base-data-access/data-access.service";
import { NotificationService } from "src/app/shared/notification/notification.service";
import { TipoUtilizador } from "../enums/tipo-utilizador.enum";
import { UserModel } from "../models/user.model";
import { UserState } from "../state/user.state";

@Injectable()
export class UserFacade {

    constructor(
        private apiService: DataAccessService,
        private userState: UserState,
        private notificationService: NotificationService
    )
    { }

    updateUriForSearch(){
      this.userState.isLoadingContent = true;
      this.userState.isEmptyContent = false;

      let uri: string = `Utilizador?PageNumber=${this.userState.paginationStateContent.pageNumber}&PageSize=${this.userState.paginationStateContent.pageSize}`;

      if(this.userState.termSearchContent !== ''){
          uri = uri + `&searchstring=${this.userState.termSearchContent}`;
      }

      if(this.userState.typeSearchContent !== ''){
          uri = uri + `&tipoutilizador=${this.userState.typeSearchContent}`;
      }

      this.userState.uriForSearchContent = uri;
    }

    private validateResult(resData: ResponseModel){
        if(resData.responseEnum == ResponseEnum.SUCCESS){
            let users: UserModel[] = resData.data.data.rows;
            this.userState.users = users;
            this.setPaginationData(resData.data.data);

            if(users.length == 0) this.userState.isEmptyContent = true;

        }else{
            this.notificationService.error(resData.responseMsg);
            this.userState.isEmptyContent = true;
        }

        this.userState.isLoadingContent = false;
    }

    private setPaginationData(data: any){
        let _paginationData = new PaginationData(data.pageNumber);
        _paginationData.totalItems = data.totalRecords;
        _paginationData.totalPages = data.totalPages;
        _paginationData.pageNumber = data.pageNumber;
        this.userState.paginationStateContent = _paginationData;
    }

    async listUsersData() {
        this.updateUriForSearch();
        let resData: ResponseModel = await this.apiService.get(this.userState.uriForSearchContent);
        this.validateResult(resData);
    }

    async listUsersByType(tipoUtilizador: TipoUtilizador){
        this.userState.paginationStateContent.pageNumber = 0;
        this.userState.typeSearchContent = tipoUtilizador;
        this.updateUriForSearch();
        let resData: ResponseModel = await this.apiService.get(this.userState.uriForSearchContent);
        this.validateResult(resData);
    }

    async changePageNumber(pageNumber: number){
      this.userState.paginationStateContent.pageNumber = pageNumber;
      this.updateUriForSearch();
      let resData: ResponseModel = await this.apiService.get(this.userState.uriForSearchContent);
      this.validateResult(resData);
    }

    listenToSearchChanges(search$: Observable<string>): void {
        search$.pipe(
          distinctUntilChanged(),
          debounceTime(400),
          switchMap(search => {
                this.userState.paginationStateContent.pageNumber = 0;
                this.userState.termSearchContent = search;
                this.updateUriForSearch();
                return this.apiService.get(this.userState.uriForSearchContent);
            })
        )
        .subscribe((resData: any) => {
            this.validateResult(resData);
        });
    }

    async addUser(newUser: any){
        let resData: ResponseModel = await this.apiService.addUpdate(newUser, 'Utilizador');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Utilizador adicionado!');
            this.userState.isEmptyContent = true;
            this.listUsersData();
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            return false;
        }
    }

    async editUser(userUpdated: any){
        let resData: ResponseModel = await this.apiService.update(userUpdated, 'Utilizador');

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.success('Utilizador Editado!');
            this.userState.updateUser(userUpdated);
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            return false;
        }
    }

    async blockUser(id: string, state: boolean){
      this.userState.toggleBlock(id, !state);

      const stateAction = state ? 'unblock' : 'block';
      const successMessage = state ? 'Utilizador Desbloqueado!' : 'Utilizador Bloqueado!';

      let resData: ResponseModel = await this.apiService.addUpdate({id}, `Auth/account-${stateAction}`);

        if(resData.responseEnum == ResponseEnum.SUCCESS){
            this.notificationService.warning(successMessage);
            return true;
        }
        else{
            this.notificationService.error(resData.responseMsg);
            this.userState.toggleBlock(id, state);
            return false;
        }
    }

    async removeUser(id: string) {
      const user = this.userState.getById(id);
      this.userState.removeUser(id);

      let resData: ResponseModel = await this.apiService.delete(id, 'Utilizador');

      if(resData.responseEnum == ResponseEnum.SUCCESS){
        this.notificationService.success('Utilizador Removido!');
        return true;
      }
      else{
          this.notificationService.error(resData.responseMsg);
          this.userState.addUser(user);
          return false;
      }
    }

    resetSearchOnDestry(){
        if (this.userState.termSearchContent != '' ||
            this.userState.typeSearchContent != ''){

            this.userState.termSearchContent = '';
            this.userState.typeSearchContent = '';
            this.userState.isEmptyContent = true;
        }
    }

    getObservableUsers(){
        return this.userState.listUsers$;
    }

    getObservableIsLoading(){
        return this.userState.isLoading$;
    }

    getObservableIsEmpty(){
      return this.userState.isEmptyList$;
    }

    getObservablePagination(){
        return this.userState.paginationState$;
    }

}
