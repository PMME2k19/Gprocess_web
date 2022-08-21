import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { ResponseModel } from 'src/app/base-models/base/ResponseModel';
import { DataAccessService } from 'src/app/core/base-data-access/data-access.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { TipoRelatorio } from './enums/tipoRelatorios.enum';
import { Report } from './models/report.model';
import { ReportState } from './state/reports.state';

@Injectable()
export class ReportFacade {

  reports$: Observable<Report> = this.reportState.report$;

  constructor(
    private apiService: DataAccessService,
    private reportState: ReportState,
    private notificationService: NotificationService
  ) {

  }

  async getReport(tipoRelatorio: TipoRelatorio, dataInicial: string, dataFinal: string) {
    this.reportState.isLoadingContent = true;
    this.reportState.isEmptyContent = false;

    let resData: ResponseModel = await this.apiService.get(`Processo/dadosestatisticogeral?TipoRelatorio=${tipoRelatorio}&DataInicio=${dataInicial}&DataFim=${dataFinal}`);

    if(resData.responseEnum == ResponseEnum.SUCCESS){

      let report: Report = resData.data.data;
      this.reportState.report = this.changeData(tipoRelatorio, report);

    } else{

      this.notificationService.error(resData.responseMsg);
      this.reportState.isEmptyContent = true;

    }

    this.reportState.isLoadingContent = false;
  }

  private changeData(tipoRelatorio: TipoRelatorio, report: any): Report{
    switch(tipoRelatorio){
      case TipoRelatorio.Analitico:
        report.tposDocumentos = report.tposDocumentos.map((x: any) => { return {name: x.descricao, value: x.valor} });
        report.estadosDocumentos = report.estadosDocumentos.map((x: any) => { return {name: x.descricao, value: x.valor} });
        report.outrosEstados = report.outrosEstados.map((x: any) => { return {name: x.descricao, value: x.valor} });
        break;
      case TipoRelatorio.Destino:
        report.tposTratamentos = report.tposTratamentos.map((x: any) => { return {name: x.descricao, value: x.valor} });
        break;
    }
    return report;
  }

  getObservableIsLoading(){
      return this.reportState.isLoading$;
  }

  getObservableIsEmpty(){
      return this.reportState.isEmptyList$;
  }

}
