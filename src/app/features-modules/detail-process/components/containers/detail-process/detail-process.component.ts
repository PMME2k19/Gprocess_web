import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccessLevelEnum } from 'src/app/base-enums/access-level.enum';
import { DetailProcessModel } from '../../../models/detail-process.model';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-detail-process',
  templateUrl: './detail-process.component.html',
  styleUrls: ['./detail-process.component.css']
})
export class DetailProcessComponent implements OnInit, OnDestroy {

  processoId: string = '';
  accessLevel = AccessLevelEnum;

  process$: Observable<DetailProcessModel>;
  isLoading$: Observable<boolean>;
  isEmpty$: Observable<boolean>;
  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private processFacade: ProcessFacade
  )
  {

    this.process$ = processFacade.getObservableProcess();
    this.isLoading$ = processFacade.getObservableIsLoading();
    this.isEmpty$ = processFacade.getObservableIsEmpty();

    this.routeSubscription = this.route.params.subscribe(
      (params: any) => {
        this.processoId = params['id'];
        processFacade.getProcessData(this.processoId);
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
