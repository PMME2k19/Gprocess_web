import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {

  @Input() processAcess: any;

  loading = false;

  constructor(
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  async removerUser(){
    this.loading = true;

    const dataAcess = {
      processoId: this.processAcess.processoId,
      acessosPrivado: [this.processAcess.user.id]
    };

    const result = await this.processFacade.removeAcess(dataAcess);

    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

  closeModal(){
    this.modalService.closeModal();
  }

}
