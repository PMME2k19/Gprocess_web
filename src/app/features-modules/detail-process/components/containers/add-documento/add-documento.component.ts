import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-add-documento',
  templateUrl: './add-documento.component.html',
  styleUrls: ['./add-documento.component.css']
})
export class AddDocumentoComponent implements OnInit {

  @Input() processoId: string = '';

  fileUploaded: any = undefined;
  loading = false;

  constructor(
    private processFacade: ProcessFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  onFileDropped(file: any) {
    this.fileUploaded = file;
  }

  fileBrowseHandler(event: any) {
    if(event.target.files && event.target.files.length){
      this.fileUploaded = event.target.files[0];
    }
  }

  limparFicheiro(inputFile: any){
    this.fileUploaded = undefined;
    inputFile.value = '';
  }

  async enviarArquivo(){
    this.loading = true;

    const formdata = new FormData();
    formdata.append('Arquivos', this.fileUploaded, this.fileUploaded.name);

    const result = await this.processFacade.addArquivo(this.processoId, formdata);

    this.loading = false;

    if (result) {
      this.modalService.closeModal();
    }
  }

}
