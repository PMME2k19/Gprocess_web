import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RelatorioAnaliticoComponent } from './components/presentationals/relatorio-analitico/relatorio-analitico.component';
import { RelatorioDestinoComponent } from './components/presentationals/relatorio-destino/relatorio-destino.component';
import { ReportFacade } from './report.facade';
import { DataAccessModule } from 'src/app/core/base-data-access/data-access.module';
import { ReportState } from './state/reports.state';
import { ReportComponent } from './components/containers/report/report.component';
import { GraphEmptyPipe } from './pipes/graph-empty.pipe';


@NgModule({
  declarations: [
    ReportComponent,
    RelatorioAnaliticoComponent,
    RelatorioDestinoComponent,
    GraphEmptyPipe
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    NgxChartsModule,
    DataAccessModule
  ],
  providers: [
    ReportState,
    ReportFacade
  ]
})
export class ReportModule { }
