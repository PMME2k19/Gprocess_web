import { Component, Input, OnInit } from '@angular/core';
import { AccessLevelEnum } from 'src/app/base-enums/access-level.enum';
import { ProcessStateEnum } from 'src/app/features-modules/list/enums/process-state-enum';
import { UserPermission } from 'src/app/shared/helpers/user-permission';

@Component({
  selector: 'app-footer-option',
  templateUrl: './footer-option.component.html',
  styleUrls: ['./footer-option.component.css']
})
export class FooterOptionComponent implements OnInit {

  @Input() processoId: string = '';
  @Input() estadoActual = ProcessStateEnum.Criado;
  @Input() IsTratamentoColcuidoUltimoDespacho: boolean = false;

  processStateEnum = ProcessStateEnum;
  userProfileLevel = new UserPermission();

  showSolicitarDespacho: boolean = false;
  showDarDespacho: boolean = false;
  showDarTratamento: boolean = false;
  showEnviarAnalise: boolean = false;
  showArquivarProcesso: boolean = false;
  showDeixarObservacao: boolean = false;
  showMarcarReuniao: boolean = false;
  showAddDocumento: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.showSolicitarDespacho = false;
    this.showDarDespacho = false;
    this.showDarTratamento = false;
    this.showEnviarAnalise = false;
    this.showArquivarProcesso = false;
    this.showDeixarObservacao = false;
    this.showMarcarReuniao = false;
    this.showAddDocumento = false;
  }

}
