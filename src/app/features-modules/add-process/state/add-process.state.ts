import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SelectInput } from "src/app/shared/components/select-input/select-input.model";
import { SelectUser } from "src/app/shared/components/select-user/select-user.model";

@Injectable()
export class AddProcessState {
    private usersList: BehaviorSubject<SelectUser[]> = new BehaviorSubject<SelectUser[]>([]);
    public readonly usersList$: Observable<SelectUser[]>;

    private processTypesList: BehaviorSubject<SelectInput[]> = new BehaviorSubject<SelectInput[]>([]);
    public readonly processTypesList$: Observable<SelectInput[]>;

    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isLoading$: Observable<boolean>;

    private isLoadingUsers: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isLoadingUsers$: Observable<boolean>;

    private isLoadingTypes: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isLoadingTypes$: Observable<boolean>;

    private isEmptyList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isEmptyList$: Observable<boolean>;

    constructor(){
      this.usersList$ = this.usersList.asObservable();
      this.processTypesList$ = this.processTypesList.asObservable();
      this.isLoading$ = this.isLoading.asObservable();
      this.isLoadingUsers$ = this.isLoadingUsers.asObservable();
      this.isLoadingTypes$ = this.isLoadingTypes.asObservable();
      this.isEmptyList$ = this.isEmptyList.asObservable();
    }

    get users (): SelectUser[] {
      return this.usersList.getValue();
    }

    set users (users: SelectUser[]){
      this.usersList.next(users);
    }

    get processTypes (): SelectInput[] {
        return this.processTypesList.getValue();
    }
  
    set processTypes (types: SelectInput[]){
        this.processTypesList.next(types);
    }

    get isLoadingContent () : boolean {
        return this.isLoading.getValue();
    }
  
    set isLoadingContent (val: boolean) {
        this.isLoading.next(val);
    }

    get isLoadingTypesContent () : boolean {
        return this.isLoadingTypes.getValue();
    }
  
    set isLoadingTypesContent (val: boolean) {
        this.isLoadingTypes.next(val);
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
