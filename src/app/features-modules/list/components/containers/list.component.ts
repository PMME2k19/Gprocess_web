import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PaginationData } from 'src/app/base-models/base/pagination-data.model';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';
import { AppService } from 'src/app/core/services/app.service';
import { SelectInput } from 'src/app/shared/components/select-input/select-input.model';
import { UserPermission } from 'src/app/shared/helpers/user-permission';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ListFacade } from '../../list.facade';
import { ProcessModel } from '../../models/process-model';
import { ProcessResumeModel } from '../../models/process-resume-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  userProfileLevel = new UserPermission();

  displayProcessesType: string = 'none';
  isPublic: boolean = true;
  selectedProcess: string = "Processos Públicos";

  processes$: Observable<ProcessModel[]>;
  isEmpty$: Observable<boolean>;
  isLoadingProcesses$: Observable<boolean>;
  isLoadingTypes$: Observable<boolean>;

  resumeValue: ProcessResumeModel[] = [];

  listType: SelectInput [] = [];

  listPriorities: SelectInput [] = [
    {id: 2, nome: 'Normal', enum: 0},
    {id: 3, nome: 'Urgente', enum: 1},
    {id: 4, nome: 'Muito Urgente', enum: 2},
    {id: 5, nome: 'Imediatamente Urgente', enum: 3}
  ];

  listStates: SelectInput [] = [
    {id: 2, nome: 'Registado', enum: 0},
    {id: 3, nome: 'Em Despacho', enum: 1},
    {id: 4, nome: 'Despachado sem Tratamento', enum: 7},
    {id: 5, nome: 'Despachado Internamente', enum: 2},
    {id: 6, nome: 'Despachado Externamente', enum: 3},
    {id: 7, nome: 'Despachado Interno/Externo', enum: 4},
    {id: 8, nome: 'Em Análise', enum: 5},
    {id: 9, nome: 'Arquivado', enum: 6}
  ];

  prioritySearch = new FormControl('');
  actualStateSearch = new FormControl('');
  dateSearch = new FormControl('');
  typeSearch = new FormControl('');
  termSearch = new FormControl('');

  subscriptionType: Subscription;
  subscriptionState: Subscription;
  subscriptionPriority: Subscription;
  subscriptionDate: Subscription;

  paginationData: PaginationNumbers = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    currentSubsetPages: []
  };

  constructor(
    private listFacade: ListFacade,
    private appService: AppService,
    private notificationService: NotificationService
  )
  {
    this.processes$ = listFacade.getObservableProcesses();
    this.isEmpty$ = listFacade.getObservableIsEmpty();
    this.isLoadingProcesses$ = listFacade.listState.isLoadingProcesses$;
    this.isLoadingTypes$ = listFacade.getObservableIsLoadingType();

    this.subscriptionType = this.subscribeType();
    this.subscriptionPriority = this.subscribePriority();
    this.subscriptionState = this.subscribeState();
    this.subscriptionDate = this.subscribeDate();
  }

  async ngOnInit() {

    /*if(this.listFacade.getIsEmptyValue()){
    }*/
    setTimeout( async () => {
      await this.listFacade.setProcessData();
      await this.getProcessesTypes();
    }, 400);

    //unsubscribe
    this.listFacade.listState.processResume$.subscribe( (resume) => {
        this.resumeValue = resume;
    });

    this.listFacade.listState.paginationState$.subscribe( () => {
      this.updatePaginationDataForChildComponent();
    });

    this.listFacade.listenToSearchChanges(this.termSearch.valueChanges);

  }

  ngOnDestroy(): void {
    this.listFacade.resetSearchOnDestry();
  }

  subscribeType(){
    return this.typeSearch.valueChanges.subscribe(value => {
      this.listFacade.listState.typeIdSearchContent = value == null ? '' : value.id;
      this.listFacade.listState.paginationStateContent = new PaginationData();
      this.listFacade.updateUriForSearch();
      this.getAsyncData(this.listFacade.listState.uriForSearchContent);
    });
  }

  subscribePriority(){
    return this.prioritySearch.valueChanges.subscribe(value => {
      this.listFacade.listState.prioritySearchContent = value == null ? -1 : value.enum;
      this.listFacade.listState.paginationStateContent = new PaginationData();
      this.listFacade.updateUriForSearch();
      this.getAsyncData(this.listFacade.listState.uriForSearchContent);
    });
  }

  subscribeState(){
    return this.actualStateSearch.valueChanges.subscribe(value => {
      this.listFacade.listState.actualStateSearchContent = value == null ? -1 : value.enum;
      this.listFacade.listState.paginationStateContent = new PaginationData();
      this.listFacade.updateUriForSearch();
      this.getAsyncData(this.listFacade.listState.uriForSearchContent);
    });
  }

  subscribeDate(){
    return this.dateSearch.valueChanges.subscribe((value: string) => {
      if(value.length > 0){
        let arr: string[] = value.split('-');
        let date: string = arr[0] + '/' + arr[1] + '/' + arr[2];
        if(!this.appService.validateDate(date)){
          this.notificationService.warning("Data de pesquisa não pode ser maior que a data actual.");
          return;
        }
        this.listFacade.listState.dateSearchContent = date;
      }
      else  this.listFacade.listState.dateSearchContent = '';
      this.listFacade.listState.paginationStateContent = new PaginationData();
      this.listFacade.updateUriForSearch();
      this.getAsyncData(this.listFacade.listState.uriForSearchContent);
    });
  }

  async getProcessesTypes(){
    this.listType = await this.listFacade.getDocTypes();
  }

  get processType(): number {
    return this.isPublic ? 0 : 1;
  }

  async getPublicProcesses(){
    this.listFacade.listState.processTypeContent = this.processType;
    this.listFacade.listState.paginationStateContent = new PaginationData();
    this.listFacade.updateUriForSearch();
    this.getAsyncData(this.listFacade.listState.uriForSearchContent);
  }

  async getPrivateProcesses(){
    this.listFacade.listState.processTypeContent = this.processType;
    this.listFacade.listState.paginationStateContent = new PaginationData();
    this.listFacade.updateUriForSearch();
    this.getAsyncData(this.listFacade.listState.uriForSearchContent);
  }

  updatePaginationDataForChildComponent(){
    this.paginationData = {
      totalItems: this.listFacade.listState.paginationStateContent.totalItems,
      totalPages: this.listFacade.listState.paginationStateContent.totalPages,
      currentPage: this.listFacade.listState.paginationStateContent.pageNumber,
      currentSubsetPages: []
    }
  }

  async getAsyncData(params: string){
    await this.listFacade.setProcessData(params);
  }

  toggleProcessesType(){
    if(this.displayProcessesType === 'none'){
      this.displayProcessesType = 'inherit';
    }
    else
    {
      this.displayProcessesType = 'none';
    }
  }

  closeProcessesType(){
    if(this.displayProcessesType === 'inherit'){
      this.displayProcessesType = 'none';
    }
  }

  selectPublicProcesses(){
    this.isPublic = true;
    this.selectedProcess = 'Processos Públicos';
    this.displayProcessesType = 'none';
    this.getPublicProcesses();
  }

  selectPrivateProcesses(){
    this.isPublic = false;
    this.selectedProcess = 'Processos Restritos';
    this.displayProcessesType = 'none';
    this.getPrivateProcesses();
  }

  /*******************************Pagination Methods*/

  /*goToPreviewPage(){
    let prevPage = this.listFacade.listState.paginationStateContent.pageNumber - 1;
    if(prevPage <= 0) prevPage = 1;
    let paginationDataContent = new PaginationData(prevPage);
    paginationDataContent.totalPages = this.listFacade.listState.paginationStateContent.totalPages;
    this.listFacade.listState.paginationStateContent = paginationDataContent;
    this.listFacade.updateUriForSearch();
    this.getAsyncData(this.listFacade.listState.uriForSearchContent);
  }

  goToFirstPage(){
    let paginationDataContent = new PaginationData();
    paginationDataContent.totalPages = this.listFacade.listState.paginationStateContent.totalPages;
    this.listFacade.listState.paginationStateContent = paginationDataContent;
    this.listFacade.updateUriForSearch();
    this.getAsyncData(this.listFacade.listState.uriForSearchContent);
  }*/

  goToPageNumber(pageNumber: number){
    let paginationDataContent = new PaginationData(pageNumber);
    paginationDataContent.totalPages = this.listFacade.listState.paginationStateContent.totalPages;
    this.listFacade.listState.paginationStateContent = paginationDataContent;
    this.listFacade.updateUriForSearch();
    this.getAsyncData(this.listFacade.listState.uriForSearchContent);
  }

  /*goToEndPage(){
    let paginationDataContent = new PaginationData(this.listFacade.listState.paginationStateContent.totalPages);
    paginationDataContent.totalPages = this.listFacade.listState.paginationStateContent.totalPages;
    this.listFacade.listState.paginationStateContent = paginationDataContent;
    this.listFacade.updateUriForSearch();
    this.getAsyncData(this.listFacade.listState.uriForSearchContent);
  }

  goToNextPage(){
    let nextPage = this.listFacade.listState.paginationStateContent.pageNumber + 1;
    let lastPage = this.listFacade.listState.paginationStateContent.totalPages;
    if(nextPage >= lastPage) nextPage = lastPage;
    let paginationDataContent = this.listFacade.listState.paginationStateContent;
    paginationDataContent.pageNumber = nextPage;
    paginationDataContent.totalPages = this.listFacade.listState.paginationStateContent.totalPages;
    this.listFacade.listState.paginationStateContent = paginationDataContent;
    this.listFacade.updateUriForSearch();
    this.getAsyncData(this.listFacade.listState.uriForSearchContent);
  }*/
}
