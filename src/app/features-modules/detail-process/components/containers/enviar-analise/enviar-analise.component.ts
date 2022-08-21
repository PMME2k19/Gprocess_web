import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-enviar-analise',
  templateUrl: './enviar-analise.component.html',
  styleUrls: ['./enviar-analise.component.css']
})
export class EnviarAnaliseComponent implements OnInit {

  @Input() processoId: string = '';

  analise!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.analise = this.fb.group({
      processoId: [this.processoId],
      observacao: ['', Validators.required],
      dataRetorno: ['', Validators.required]
    });
  }

  async enviarAnalise(){
    if (this.analise.invalid) return;

    this.loading = true;

    const formSolicitacao = this.analise.value;
    formSolicitacao.processoId = this.processoId;

    const result = await this.processFacade.passarParaAnalise(formSolicitacao);

    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

}
