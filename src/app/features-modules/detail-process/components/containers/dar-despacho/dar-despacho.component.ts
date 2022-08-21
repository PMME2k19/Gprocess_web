import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PrioritiesEnum } from 'src/app/base-enums/priorities.enum';
import { SelectInput } from 'src/app/shared/components/select-input/select-input.model';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { FormaAcusacaoEnum } from '../../../enums/forma-acusacao.enum';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-dar-despacho',
  templateUrl: './dar-despacho.component.html',
  styleUrls: ['./dar-despacho.component.css']
})
export class DarDespachoComponent implements OnInit {

  @Input() processoId: string = '';

  despacho!: FormGroup;
  loading = false;
  actualDate = new Date();

  formaAcusacao = new FormControl(FormaAcusacaoEnum.Fisica);

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
  ) { }

  ngOnInit(): void {
    this.despacho = this.fb.group({
      teor: ['', Validators.required],
      dataExpedicao: ['', Validators.required],
      prazoEmDias: ['', Validators.required],
      prioridade: ['', Validators.required]
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
  }

  async darDespacho(){
    if (this.despacho.invalid) return;

    this.loading = true;

    const formDespacho = this.despacho.value;
    const formaAcusacao = this.formaAcusacao.value == FormaAcusacaoEnum.Fisica ? 0 : 1;

    const novodespacho = {
      processoId: this.processoId,
      teor: formDespacho.teor,
      dataExpedicao: formDespacho.dataExpedicao,
      prazoEmDias: formDespacho.prazoEmDias.id,
      prioridade: formDespacho.prioridade.enum,
      arquivo: '',
    }

    const result = await this.processFacade.darDespacho(novodespacho);
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
  }

}
