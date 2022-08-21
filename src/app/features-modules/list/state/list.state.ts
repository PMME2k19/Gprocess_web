import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ProcessModel } from "../models/process-model";
import { ProcessResumeModel } from "../models/process-resume-model";
import { ProcessStateEnum } from '../enums/process-state-enum';
import { BaseState } from "src/app/base-state/base-state";
import { PaginationData } from "src/app/base-models/base/pagination-data.model";
import { ProcessStateModel } from "../models/process-state-model";

@Injectable()
export class ListState extends BaseState<ProcessStateModel> {
    private listFilteredProcesses: BehaviorSubject<ProcessModel[]> = new BehaviorSubject<ProcessModel[]>([]);
    public readonly listFilteredProcesses$: Observable<ProcessModel[]>;
    private processResume: BehaviorSubject<ProcessResumeModel[]> = new BehaviorSubject<ProcessResumeModel[]>([]);
    public readonly processResume$: Observable<ProcessResumeModel[]>;
    private isEmptyList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isEmptyList$: Observable<boolean>;
    private isLoadingProcesses: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isLoadingProcesses$: Observable<boolean>;
    private isLoadingType: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public readonly isLoadingType$: Observable<boolean>;

    private prioritySearch: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
    public readonly prioritySearch$: Observable<number>;

    private actualStateSearch: BehaviorSubject<number> = new BehaviorSubject<ProcessStateEnum>(-1);
    public readonly actualStateSearch$: Observable<number>;

    private dateSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly dateSearch$: Observable<string>;

    private typeIdSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly typeIdSearch$: Observable<string>;

    private termSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly termSearch$: Observable<string>;

    private processType: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public readonly processType$: Observable<number>;

    private uriForSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly uriForSearch$: Observable<string>;

    constructor(){
        super(new ProcessStateModel());
        this.listFilteredProcesses$ = this.listFilteredProcesses.asObservable();
        this.processResume$ = this.processResume.asObservable();
        this.isEmptyList$ = this.isEmptyList.asObservable();
        this.isLoadingType$ = this.isLoadingType.asObservable();
        this.isLoadingProcesses$ = this.isLoadingProcesses.asObservable();

        this.prioritySearch$ = this.prioritySearch.asObservable();
        this.actualStateSearch$ = this.actualStateSearch.asObservable();
        this.dateSearch$ = this.dateSearch.asObservable();
        this.typeIdSearch$ = this.typeIdSearch.asObservable();
        this.termSearch$ = this.termSearch.asObservable();
        this.processType$ = this.processType.asObservable();
        this.uriForSearch$ = this.uriForSearch.asObservable();
    }

    //Filter State

    get prioritySearchContent (): number {
        return this.prioritySearch.getValue();
    }

    set prioritySearchContent (val: number){
        this.prioritySearch.next(val);
    }

    get actualStateSearchContent (): number {
        return this.actualStateSearch.getValue();
    }

    set actualStateSearchContent (val: number){
        this.actualStateSearch.next(val);
    }

    get dateSearchContent (): string {
        return this.dateSearch.getValue();
    }

    set dateSearchContent (val: string){
        this.dateSearch.next(val);
    }

    get typeIdSearchContent (): string {
        return this.typeIdSearch.getValue();
    }

    set typeIdSearchContent (val: string){
        this.typeIdSearch.next(val);
    }

    get termSearchContent (): string {
        return this.termSearch.getValue();
    }

    set termSearchContent (val: string){
        this.termSearch.next(val);
    }

    get processTypeContent (): number {
        return this.processType.getValue();
    }

    set processTypeContent (val: number){
        this.processType.next(val);
    }

    get uriForSearchContent (): string {
        return this.uriForSearch.getValue();
    }

    set uriForSearchContent (val: string){
        this.uriForSearch.next(val);
    }

    //*********************************/

    get processes (): ProcessModel[] {
        return this.listFilteredProcesses.getValue();
    }

    set processes (processList: ProcessModel[]){
        this.listFilteredProcesses.next(processList);
    }

    get resume (): ProcessResumeModel[] {
        return this.processResume.getValue();
    }

    set resume (processResume: ProcessResumeModel[]){
        this.processResume.next(processResume);
    }

    get isEmptyContent () : boolean {
        return this.isEmptyList.getValue();
    }

    set isEmptyContent (val: boolean) {
        this.isEmptyList.next(val);
    }

    get isLoadingProcessesContent () : boolean {
        return this.isLoadingProcesses.getValue();
    }

    set isLoadingProcessesContent (val: boolean) {
        this.isLoadingProcesses.next(val);
    }

    get isLoadingTypeContent () : boolean {
        return this.isLoadingType.getValue();
    }

    set isLoadingTypeContent (val: boolean) {
        this.isLoadingType.next(val);
    }

}
