import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrioritiesEnum } from 'src/app/base-enums/priorities.enum';
import { SelectInput } from 'src/app/shared/components/select-input/select-input.model';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { FormaAcusacaoEnum } from '../../../enums/forma-acusacao.enum';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-dar-tratamento',
  templateUrl: './dar-tratamento.component.html',
  styleUrls: ['./dar-tratamento.component.css']
})
export class DarTratamentoComponent implements OnInit {

  @Input() processoId: string = '';

  despacho!: FormGroup;
  loading = false;
  actualDate = new Date();
  ultimoDespacho: any;

  formaAcusacao = new FormControl(FormaAcusacaoEnum.Fisica);
  arquivarSubmeter = new FormControl(false);

  listPriorities: SelectInput [] = [
    {id: 1, nome: 'Normal', enum: 0},
    {id: 2, nome: 'Urgente', enum: 1},
    {id: 3, nome: 'Muito Urgente', enum: 2},
    {id: 4, nome: 'Imediatamente Urgente', enum: 3}
  ];

  listTipoTratamento: SelectInput [] = [
    {id: 0, nome: 'Tratamento Interno'},
    {id: 1, nome: 'Tratamento Externo'},
    {id: 2, nome: 'Tratamento Interno/Externo'}
  ];

  listPrazoEmDias: SelectInput [] = [
    {id: 1, nome: '1'},
    {id: 2, nome: '2'},
    {id: 3, nome: '3'},
    {id: 4, nome: '4'}
  ];

  constructor(
    private fb: FormBuilder,
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ){ }

  ngOnInit(): void {
    this.ultimoDespacho = this.processFacade.getUltimoDespacho();
    this.despacho = this.fb.group({
      teor: [this.ultimoDespacho.teor, Validators.required],
      destinatario: ['', Validators.required],
      dataExpedicao: [this.formatarData(this.ultimoDespacho.expedicao.data), Validators.required],
      nRef: ['', Validators.required],
      prazoEmDias: ['', Validators.required],
      prioridade: ['', Validators.required],
      tipoTratamento: ['', Validators.required]
    });

    this.despacho.controls['prioridade'].valueChanges.subscribe(x => {
      if (x){
        switch(x.enum){
          case PrioritiesEnum.Normal:
            this.criarPrazoDias(7, 15);
            break;
          case PrioritiesEnum.Urgente:
            this.criarPrazoDias(1, 2);
            break;
          case PrioritiesEnum.MuitoUrgente:
            this.criarPrazoDias(1, 1);
            break;
          case PrioritiesEnum.ImediatamenteUrgente:
            this.criarPrazoDias(1, 1);
            break;
        }
      }
    });

    this.despacho.controls['prioridade'].setValue(this.listPriorities.filter(x => x.enum == this.ultimoDespacho.expedicao.prioridade)[0]);
  }

  async darTratamento(){
    if (this.despacho.invalid) return;

    this.loading = true;

    const formTratamento = this.despacho.value;
    const formaAcusacao = this.formaAcusacao.value == FormaAcusacaoEnum.Fisica ? 0 : 1;
    const isParaArquivar = this.arquivarSubmeter.value;
    
    const novoTratamento = {
      processoId: this.processoId,
      Id: this.ultimoDespacho.id,
      destinatario: formTratamento.destinatario,
      nRef: formTratamento.nRef,
      tipoTratamento: formTratamento.tipoTratamento.id,
      arquivo: '',
      formaAcusacao,
      isParaArquivar
    }

    const result = await this.processFacade.darTratamento(novoTratamento);
    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

  criarPrazoDias(inicio: number, final: number) {
    const dias = [];

    for(let i = inicio; i<=final; i++) {
      dias.push({id: i, nome: i.toString()});
    }

    this.despacho.controls['prazoEmDias'].reset();
    this.listPrazoEmDias = dias;
    this.despacho.controls['prazoEmDias'].setValue(this.listPrazoEmDias.filter(x => x.id == this.ultimoDespacho.expedicao.prazoEmDias)[0]);
  }

  formatarData(value: any) {
    const date = new Date(value);
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return date.getFullYear() + '-' + month + '-' + day;
  }

}
