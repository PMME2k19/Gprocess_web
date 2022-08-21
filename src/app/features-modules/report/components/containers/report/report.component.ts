import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/core/services/app.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { DatePipe } from 'src/app/shared/pipes/date.pipe';
import { TipoRelatorio } from '../../../enums/tipoRelatorios.enum';
import { ReportFacade } from '../../../report.facade';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isEmpty$: Observable<boolean>;

  filtros!: FormGroup;
  tipoRelatorioID = TipoRelatorio.Analitico;
  tipoRelatorio = TipoRelatorio;
  datePipe = new DatePipe();
  actualDate = new Date();

  listaTipoRelatorios = [
    {id: TipoRelatorio.Analitico, nome: 'Analítico'},
    {id: TipoRelatorio.Destino, nome: 'Destino'}
  ];

  constructor(
    private fb: FormBuilder,
    public reportFacade: ReportFacade,
    private appService: AppService,
    private notificationService: NotificationService
  ) {
    this.isLoading$ = reportFacade.getObservableIsLoading();
    this.isEmpty$ = reportFacade.getObservableIsEmpty();
  }

  ngOnInit(): void {
    this.filtros = this.fb.group({
      tipoRelatorio: [this.listaTipoRelatorios[0], Validators.required],
      dataInicial: [''],
      dataFinal: ['']
    });

    this.searchReport();
  }

  searchReport(){
    this.tipoRelatorioID = this.filtros.value['tipoRelatorio'].id;

    const dataInicial = this.datePipe.transform(this.filtros.value['dataInicial']);
    const dataFinal = this.datePipe.transform(this.filtros.value['dataFinal']);

    if(!this.appService.validateDate(this.filtros.value['dataInicial'])){
      this.notificationService.warning("Data inicial não pode ser maior que a data actual.");
      return;
    }

    if(!this.appService.validateDate(this.filtros.value['dataFinal'])){
      this.notificationService.warning("Data final não pode ser maior que a data actual.");
      return;
    }

    this.reportFacade.getReport(this.tipoRelatorioID, dataInicial, dataFinal);
  }

}
