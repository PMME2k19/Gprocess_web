import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { createTempReport, Report } from '../models/report.model';

@Injectable()
export class ReportState {

  private readonly _report = new BehaviorSubject<Report>(createTempReport());

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public readonly isLoading$: Observable<boolean>;

  private isEmptyList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isEmptyList$: Observable<boolean>;

  constructor(){
    this.isLoading$ = this.isLoading.asObservable();
    this.isEmptyList$ = this.isEmptyList.asObservable();
  }

  public get report$(): Observable<Report> {
    return this._report.asObservable();
  }

  get report(): Report {
    return this._report.getValue();
  }

  set report(val: Report) {
    this._report.next(val);
  }

  public addReport(report: Report): Report {
    this.report = report;
    return report;
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
}
