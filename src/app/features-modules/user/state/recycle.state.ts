import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ContentMessageEnum } from "src/app/base-enums/content-message.enum";
import { PaginationData } from "src/app/base-models/base/pagination-data.model";
import { UserModel } from "../models/user.model";

@Injectable()
export class RecycleState {
    private listUsers: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
    public readonly listUsers$: Observable<UserModel[]>;

    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isLoading$: Observable<boolean>;

    private isEmptyList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isEmptyList$: Observable<boolean>;

    private messageType: BehaviorSubject<ContentMessageEnum> = new BehaviorSubject<ContentMessageEnum>(ContentMessageEnum.DEFAULT);
    public readonly messageType$: Observable<ContentMessageEnum>;

    private _paginationState: BehaviorSubject<PaginationData> = new BehaviorSubject<PaginationData>(new PaginationData());
    public readonly paginationState$: Observable<PaginationData>;

    private termSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly termSearch$: Observable<string>;

    private uriForSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly uriForSearch$: Observable<string>;

    constructor(){
      this.listUsers$ = this.listUsers.asObservable();
      this.isLoading$ = this.isLoading.asObservable();
      this.isEmptyList$ = this.isEmptyList.asObservable();
      this.messageType$ = this.messageType.asObservable();
      this.paginationState$ = this._paginationState.asObservable();
      this.termSearch$ = this.termSearch.asObservable();
      this.uriForSearch$ = this.uriForSearch.asObservable();
    }

    get users (): UserModel[] {
      return this.listUsers.getValue();
    }

    set users (userList: UserModel[]){
      this.listUsers.next(userList);
    }

    get isLoadingContent () : boolean {
      return this.isLoading.getValue();
    }

    set isLoadingContent (val: boolean) {
      this.isLoading.next(val);
    }

    get isEmptyContent () : boolean {
      return this.isEmptyList.getValue();
    }

    set isEmptyContent (val: boolean) {
      this.isEmptyList.next(val);
    }

    get messageTypeContent () : ContentMessageEnum {
      return this.messageType.getValue();
    }

    set messageTypeContent (val: ContentMessageEnum) {
      this.messageType.next(val);
    }

    get paginationStateContent (): PaginationData {
      return this._paginationState.getValue();
    }

    set paginationStateContent (nextState: PaginationData) {
      this._paginationState.next(nextState);
    }

    get termSearchContent (): string {
        return this.termSearch.getValue();
    }

    set termSearchContent (val: string){
        this.termSearch.next(val);
    }

    get uriForSearchContent (): string {
      return this.uriForSearch.getValue();
    }

    set uriForSearchContent (val: string){
        this.uriForSearch.next(val);
    }

    getById(id: string): any {
      return this.users.find(user => user.id === id);
    }

    addUser(user: UserModel): UserModel {
        const currentValue = this.users;
        this.users = [ ...currentValue, user ];
        return user;
    }

    removeUser(id: string): void {
      this.users = this.users.filter(t => t.id !== id);
    }
}
