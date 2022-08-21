import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-deixar-observacao',
  templateUrl: './deixar-observacao.component.html',
  styleUrls: ['./deixar-observacao.component.css']
})
export class DeixarObservacaoComponent implements OnInit {

  @Input() processoId: string = '';

  observacao!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.observacao = this.fb.group({
      processoId: [this.processoId],
      observacao: ['', Validators.required]
    });
  }

  async deixarObservacao() {
    if (this.observacao.invalid) return;

    this.loading = true;

    const formObservacao = this.observacao.value;
    formObservacao.processoId = this.processoId;

    const result = await this.processFacade.adicionarObservacao(formObservacao);

    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

}
