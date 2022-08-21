import { Component, OnInit, ViewChild, DoCheck, Input } from '@angular/core';
import { mockTipoTratamento } from '../../../mocks/charts.mock';
import { Color, ScaleType, AdvancedPieChartComponent } from '@swimlane/ngx-charts';
import { percentageFormatting } from '../../../helpers/percentage.helper';

@Component({
  selector: 'app-relatorio-destino',
  templateUrl: './relatorio-destino.component.html',
  styleUrls: ['./relatorio-destino.component.css']
})
export class RelatorioDestinoComponent implements OnInit, DoCheck {

  @ViewChild(AdvancedPieChartComponent) pieChart!: AdvancedPieChartComponent;

  percentageFormatting = percentageFormatting;
  @Input() tipoTratamento = mockTipoTratamento;
  tipoTratamentoColors = { domain: ['#3CA16B', '#FF9900', '#D2783B'], group: ScaleType.Linear, selectable: true, name: 'Tipo Tratamento'};

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
    if (this.pieChart){
      this.pieChart.innerRadius = 60;
    }
  }

}
