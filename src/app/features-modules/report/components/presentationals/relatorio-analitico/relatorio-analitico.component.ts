import { Component, OnInit, ViewChild, DoCheck, Input } from '@angular/core';
import { Color, ScaleType, AdvancedPieChartComponent } from '@swimlane/ngx-charts';
import { percentageFormatting } from '../../../helpers/percentage.helper';
import { mockEstadoDocumentos, mockOutrosEstados, mockTipoDocumentos } from '../../../mocks/charts.mock';

@Component({
  selector: 'app-relatorio-analitico',
  templateUrl: './relatorio-analitico.component.html',
  styleUrls: ['./relatorio-analitico.component.css']
})
export class RelatorioAnaliticoComponent implements OnInit, DoCheck {

  @ViewChild(AdvancedPieChartComponent) pieChart!: AdvancedPieChartComponent;

  percentageFormatting = percentageFormatting;
  @Input() tipoDocumentos = mockTipoDocumentos;
  @Input() estadoDocumentos = mockEstadoDocumentos;
  @Input() outrosEstados = mockOutrosEstados;

  tipoDocumentosColors = { domain: ['#3CA16B', '#FF9900', '#D9534F', '#1F64BC', '#4E4E4E', '#4A537A'], group: ScaleType.Linear, selectable: true, name: 'Tipo Documentos'};
  estadoDocumentosColors = { domain: ['#3CA16B'], group: ScaleType.Ordinal, selectable: true, name: 'Tipo Documentos'};
  outrosEstadoColors = { domain: ['#FF9900', '#D9534F'], group: ScaleType.Ordinal, selectable: true, name: 'Tipo Documentos'};

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
    if (this.pieChart){
      this.pieChart.innerRadius = 60;
    }
  }

}
