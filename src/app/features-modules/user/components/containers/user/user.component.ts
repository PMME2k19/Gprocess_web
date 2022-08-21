import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';
import { TipoUtilizador } from '../../../enums/tipo-utilizador.enum';
import { UserModel } from '../../../models/user.model';
import { UserFacade } from '../../../facades/user.facade';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  users$: Observable<UserModel[]>;
  isEmpty$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  search = new FormControl('');
  tipoUtilizadorSearch = new FormControl('');

  showCreateUserModal = false;
  showEditUserModal = false;
  showDeleteUserModal = false;
  showDesactiveUserModal = false;

  currentUser!: UserModel;
  isCurrentBloqueado = false;

  tipoUtilizadorSearchSubscription$!: Subscription;

  listUsersTypes = [
    {id: 0, nome: TipoUtilizador.Admin},
    {id: 1, nome: TipoUtilizador.Director},
    {id: 2, nome: TipoUtilizador.Assistente}
  ];

  paginationData: PaginationNumbers = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    currentSubsetPages: []
  };

  constructor(private userFacade: UserFacade) {
    this.users$ = userFacade.getObservableUsers();
    this.isLoading$ = userFacade.getObservableIsLoading();
    this.isEmpty$ = userFacade.getObservableIsEmpty();
  }

  async ngOnInit() {
    await this.userFacade.listUsersData();

    this.userFacade.listenToSearchChanges(this.search.valueChanges);

    this.userFacade.getObservablePagination().subscribe({
      next: (data => {
        this.paginationData = {
          totalItems: data.totalItems,
          totalPages: data.totalPages,
          currentPage: data.pageNumber,
          currentSubsetPages: []
        }
      })
    });

    this.tipoUtilizadorSearchSubscription$ = this.tipoUtilizadorSearch.valueChanges.subscribe(response => {
      this.userFacade.listUsersByType(response == null ? '' : response.nome);
    });
  }

  setEditUser(user: UserModel): void{
    this.currentUser = user;
    this.showEditUserModal = true;
  }

  blockUser(user: UserModel): void{
    this.currentUser = user;
    this.isCurrentBloqueado = user.isBloqueado;
    this.showDesactiveUserModal = true;
  }

  deleteUser(user: UserModel){
    this.currentUser = user;
    this.showDeleteUserModal = true;
  }

  closeModal(){
    this.showCreateUserModal = false;
    this.showEditUserModal = false;
    this.showDeleteUserModal = false;
    this.showDesactiveUserModal = false;
  }

  async goToPageNumber(pageNumber: number){
    await this.userFacade.changePageNumber(pageNumber);
  }

  ngOnDestroy(): void {
    this.tipoUtilizadorSearchSubscription$.unsubscribe();
    this.userFacade.resetSearchOnDestry();
  }

}
