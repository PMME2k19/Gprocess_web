import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectInput } from 'src/app/shared/components/select-input/select-input.model';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-solicitar-despacho',
  templateUrl: './solicitar-despacho.component.html',
  styleUrls: ['./solicitar-despacho.component.css']
})
export class SolicitarDespachoComponent implements OnInit {

  @Input() processoId: string = '';

  solicitacao!: FormGroup;
  loading = false;

  listPriorities: SelectInput [] = [
    {id: 1, nome: 'Normal', enum: 0},
    {id: 2, nome: 'Urgente', enum: 1},
    {id: 3, nome: 'Muito Urgente', enum: 2},
    {id: 4, nome: 'Imediatamente Urgente', enum: 3}
  ];

  constructor(
    private fb: FormBuilder,
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.solicitacao = this.fb.group({
      prioridade: ['', Validators.required],
      observacao: ['', Validators.required]
    });
  }

  async solicitarDespacho(){

    if (this.solicitacao.invalid) return;

    this.loading = true;

    const formSolicitacao = this.solicitacao.value;

    const novaSolicitacao = {
      processoId: this.processoId,
      prioridade: formSolicitacao.prioridade.enum,
      observacao: formSolicitacao.observacao
    };

    const result = await this.processFacade.solicitarDespacho(novaSolicitacao);
    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }

  }

}
