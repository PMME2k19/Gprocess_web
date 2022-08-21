import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-arquivar-processo',
  templateUrl: './arquivar-processo.component.html',
  styleUrls: ['./arquivar-processo.component.css']
})
export class ArquivarProcessoComponent implements OnInit {

  @Input() processoId: string = '';

  arquivar!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.arquivar = this.fb.group({
      processoId: [this.processoId],
      observacao: ['', Validators.required]
    });
  }

  async arquivarProcesso() {
    if (this.arquivar.invalid) return;

    this.loading = true;

    const formArquivar = this.arquivar.value;
    formArquivar.processoId = this.processoId;

    const result = await this.processFacade.arquivarProcesso(formArquivar);

    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

}
