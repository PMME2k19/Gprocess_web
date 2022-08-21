import { Component, Input, OnInit } from '@angular/core';
import { ProcessStateEnum } from 'src/app/features-modules/list/enums/process-state-enum';

@Component({
  selector: 'app-process-step',
  templateUrl: './process-step.component.html',
  styleUrls: ['./process-step.component.css']
})
export class ProcessStepComponent implements OnInit {

  @Input() currentStep = 0;
  @Input() totalDespacho = 0;
  @Input() currentDespachoStepDescrption = '';
  @Input() IsTratamentoColcuidoUltimoDespacho = false;

  stepList = [
    {
      estadoDescription: 'Registado',
      estado: 0
    },
    {
      estadoDescription: 'Em Despacho',
      estado: 1
    },
    {
      estadoDescription: 'Despachado',
      estado: 2
    },
    {
      estadoDescription: 'Em Análise',
      estado: 5
    },
    {
      estadoDescription: 'Arquivado',
      estado: 6
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getValidCurrentStep(): ProcessStateEnum {
    if(this.currentStep >= ProcessStateEnum.DespachadoTratamentoInterno && this.currentStep <= ProcessStateEnum.DespachadoTratamentoInternoExterno || this.currentStep == ProcessStateEnum.DespachadoSemTratamento) {
      return 2;
    }
    else {
      return this.currentStep;
    }
  }

  getCurrentColor(estado: ProcessStateEnum): string {
    const currentStep = this.getValidCurrentStep();

    if (estado < currentStep || estado == ProcessStateEnum.Criado || currentStep == ProcessStateEnum.Arquivado){
      return '#3CA16B';
    }
    else if (estado == currentStep){
      return '#FF9900';
    }
    else{
      return '#EFEFEF';
    }
  }

  getDescription(estado: ProcessStateEnum): string{
    switch(estado){
      case ProcessStateEnum.Criado:
        return 'Processo criado';

      case ProcessStateEnum.SolicitadoDespacho:
        return 'Documento em análise';

      case ProcessStateEnum.DespachadoTratamentoInterno:
      case ProcessStateEnum.DespachadoTratamentoExterno:
      case ProcessStateEnum.DespachadoTratamentoInternoExterno:
        return this.IsTratamentoColcuidoUltimoDespacho ? this.currentDespachoStepDescrption : 'Pendente de tratamento';

      case ProcessStateEnum.EmAnalise:
        return 'Validação do tratamento';

      case ProcessStateEnum.Arquivado:
        return 'Fluxo concluído';

      default:
        return 'Descrição do estado';
    }
  }

}
