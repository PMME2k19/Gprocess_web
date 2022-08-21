import { Component, Input, OnInit } from '@angular/core';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';
import { ProcessFacade } from '../../../process.facade';

@Component({
  selector: 'app-accordion-documentos',
  templateUrl: './accordion-documentos.component.html',
  styleUrls: ['./accordion-documentos.component.css']
})
export class AccordionDocumentosComponent implements OnInit {

  @Input() arquivos: any;

  loading = false;

  paginationData: PaginationNumbers = {
    totalItems: 10,
    currentPage: 1,
    totalPages: 1,
    currentSubsetPages: []
  };

  constructor(private processFacade: ProcessFacade) { }

  ngOnInit(): void {
    this.calcularPagesNumber();
  }

  goToPageNumber(pageNumber: number){

  }

  calcularPagesNumber() {
    this.paginationData.totalItems = this.arquivos.length;
  }

  async downloadArquivo(arquivoID: string){
    this.loading = true;

    const result = await this.processFacade.downloadArquivo(arquivoID);

    if(result){
      const fileURL = URL.createObjectURL(result);
      window.open(fileURL, '_blank');
    }

    this.loading = false;

  }

}
