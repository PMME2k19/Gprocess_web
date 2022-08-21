import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContentMessageEnum } from 'src/app/base-enums/content-message.enum';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';
import { RecycleFacade } from '../../../facades/recycle.facade';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-recycling',
  templateUrl: './recycling.component.html',
  styleUrls: ['./recycling.component.css']
})
export class RecyclingComponent implements OnInit, OnDestroy {

  users$: Observable<UserModel[]>;
  isLoading$: Observable<boolean>;
  isEmpty$: Observable<boolean>;
  messageType$: Observable<ContentMessageEnum>;

  search = new FormControl('');

  paginationData: PaginationNumbers = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    currentSubsetPages: []
  };

  constructor(private recycleFacade: RecycleFacade) {
    this.users$ = recycleFacade.getObservableUsers();
    this.isLoading$ = recycleFacade.getObservableIsLoading();
    this.isEmpty$ = recycleFacade.getObservableIsEmpty();
    this.messageType$ = recycleFacade.getObservableMessageType();
  }

  async ngOnInit() {
    await this.recycleFacade.listUsersData();
    this.recycleFacade.listenToSearchChanges(this.search.valueChanges);

    this.recycleFacade.getObservablePagination().subscribe({
      next: (data => {
        this.paginationData = {
          totalItems: data.totalItems,
          totalPages: data.totalPages,
          currentPage: data.pageNumber,
          currentSubsetPages: []
        }
      })
    });
  }

  restoreUser(id: string){
    this.recycleFacade.restoreUser(id);
  }

  async goToPageNumber(pageNumber: number){
    await this.recycleFacade.changePageNumber(pageNumber);
  }

  ngOnDestroy(): void {
    this.recycleFacade.resetSearchOnDestry();
  }

}
