import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SelectUser } from "src/app/shared/components/select-user/select-user.model";
import { DetailProcessModel } from "../models/detail-process.model";

@Injectable()
export class ProcessState {
    private detailProcess: BehaviorSubject<DetailProcessModel> = new BehaviorSubject<DetailProcessModel>(new DetailProcessModel());
    public readonly detailProcess$: Observable<DetailProcessModel>;

    private usersList: BehaviorSubject<SelectUser[]> = new BehaviorSubject<SelectUser[]>([]);
    public readonly usersList$: Observable<SelectUser[]>;

    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isLoading$: Observable<boolean>;

    private isLoadingUsers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isLoadingUsers$: Observable<boolean>;

    private isEmptyList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isEmptyList$: Observable<boolean>;

    constructor(){
      this.detailProcess$ = this.detailProcess.asObservable();
      this.usersList$ = this.usersList.asObservable();
      this.isLoading$ = this.isLoading.asObservable();
      this.isLoadingUsers$ = this.isLoadingUsers.asObservable();
      this.isEmptyList$ = this.isEmptyList.asObservable();
    }

    get process (): DetailProcessModel {
      return this.detailProcess.getValue();
    }

    set process (process: DetailProcessModel){
      this.detailProcess.next(process);
    }

    get users (): SelectUser[] {
      return this.usersList.getValue();
    }

    set users (users: SelectUser[]){
      this.usersList.next(users);
    }

    get isLoadingContent () : boolean {
      return this.isLoading.getValue();
    }

    set isLoadingContent (val: boolean) {
      this.isLoading.next(val);
    }

    get isLoadingUsersContent () : boolean {
      return this.isLoadingUsers.getValue();
    }

    set isLoadingUsersContent (val: boolean) {
      this.isLoadingUsers.next(val);
    }

    get isEmptyContent () : boolean {
      return this.isEmptyList.getValue();
    }

    set isEmptyContent (val: boolean) {
      this.isEmptyList.next(val);
    }
}
