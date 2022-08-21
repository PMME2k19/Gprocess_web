import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-marcar-reuniao',
  templateUrl: './marcar-reuniao.component.html',
  styleUrls: ['./marcar-reuniao.component.css']
})
export class MarcarReuniaoComponent implements OnInit {

  @Input() processoId: string = '';

  reuniao!: FormGroup;
  loading = false;
  actualDate = new Date();

  textoParticipante = new FormControl('', [Validators.required]);
  listaParticipantes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.reuniao = this.fb.group({
      descricao: ['', Validators.required],
      dataReuniao: ['', Validators.required]
    });
  }

  async marcarReuniao() {
    if (this.reuniao.invalid) return;
    if (this.listaParticipantes.length == 0) return;

    this.loading = true;

    const novaReuniao = {
      processoId: this.processoId,
      participantes: this.listaParticipantes,
      ...this.reuniao.value
    };

    const result = await this.processFacade.marcarReuniao(novaReuniao);
    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

  addParticipante() {
    if (this.textoParticipante.invalid) return;

    this.listaParticipantes.push(this.textoParticipante.value);
    this.textoParticipante.reset();
  }

  removerParticipante(index: number){
    this.listaParticipantes.splice(index, 1);
  }

  limparCampos(){
    this.reuniao.reset();
    this.textoParticipante.reset();
    this.listaParticipantes = [];
  }

}
