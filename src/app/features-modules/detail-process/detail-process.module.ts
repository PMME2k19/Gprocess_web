import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailProcessRoutingModule } from './detail-process-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailProcessComponent } from './components/containers/detail-process/detail-process.component';
import { ProcessStepComponent } from './components/presentationals/process-step/process-step.component';
import { AccordionComponent } from './components/presentationals/accordion/accordion.component';
import { ProcessState } from './state/process.state';
import { ProcessFacade } from './process.facade';
import { DataAccessModule } from 'src/app/core/base-data-access/data-access.module';
import { DateConvertPipe } from './pipes/date-convert.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DateCreatePipe } from './pipes/date-create.pipe';
import { AccordionDadosDocumentoComponent } from './components/presentationals/accordion-dados-documento/accordion-dados-documento.component';
import { AccordionDocumentosComponent } from './components/presentationals/accordion-documentos/accordion-documentos.component';
import { AccordionHistoricoProcessoComponent } from './components/presentationals/accordion-historico-processo/accordion-historico-processo.component';
import { AccordionDespachosComponent } from './components/presentationals/accordion-despachos/accordion-despachos.component';
import { AccordionObservacoesComponent } from './components/presentationals/accordion-observacoes/accordion-observacoes.component';
import { AccordionReunioesComponent } from './components/presentationals/accordion-reunioes/accordion-reunioes.component';
import { AccordionAcessosComponent } from './components/presentationals/accordion-acessos/accordion-acessos.component';
import { FooterOptionComponent } from './components/presentationals/footer-option/footer-option.component';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { SolicitarDespachoComponent } from './components/containers/solicitar-despacho/solicitar-despacho.component';
import { DarDespachoComponent } from './components/containers/dar-despacho/dar-despacho.component';
import { EnviarAnaliseComponent } from './components/containers/enviar-analise/enviar-analise.component';
import { ArquivarProcessoComponent } from './components/containers/arquivar-processo/arquivar-processo.component';
import { DeixarObservacaoComponent } from './components/containers/deixar-observacao/deixar-observacao.component';
import { MarcarReuniaoComponent } from './components/containers/marcar-reuniao/marcar-reuniao.component';
import { AddDocumentoComponent } from './components/containers/add-documento/add-documento.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { RemoveUserComponent } from './components/containers/remove-user/remove-user.component';
import { AddUserAcessComponent } from './components/containers/add-user-acess/add-user-acess.component';
import { DarTratamentoComponent } from './components/containers/dar-tratamento/dar-tratamento.component';


@NgModule({
  declarations: [
    DetailProcessComponent,
    ProcessStepComponent,
    AccordionComponent,
    DateConvertPipe,
    TruncatePipe,
    DateCreatePipe,
    AccordionDadosDocumentoComponent,
    AccordionDocumentosComponent,
    AccordionHistoricoProcessoComponent,
    AccordionDespachosComponent,
    AccordionObservacoesComponent,
    AccordionReunioesComponent,
    AccordionAcessosComponent,
    FooterOptionComponent,
    SolicitarDespachoComponent,
    DarDespachoComponent,
    EnviarAnaliseComponent,
    ArquivarProcessoComponent,
    DeixarObservacaoComponent,
    MarcarReuniaoComponent,
    AddDocumentoComponent,
    DragAndDropDirective,
    RemoveUserComponent,
    AddUserAcessComponent,
    DarTratamentoComponent
  ],
  imports: [
    CommonModule,
    DetailProcessRoutingModule,
    SharedModule,
    DataAccessModule,
    ModalModule
  ],
  providers: [
    ProcessFacade,
    ProcessState
  ]
})
export class DetailProcessModule { }
