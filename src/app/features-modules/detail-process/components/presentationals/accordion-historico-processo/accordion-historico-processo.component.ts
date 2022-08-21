import { Component, Input, OnInit } from '@angular/core';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';

@Component({
  selector: 'app-accordion-historico-processo',
  templateUrl: './accordion-historico-processo.component.html',
  styleUrls: ['./accordion-historico-processo.component.css']
})
export class AccordionHistoricoProcessoComponent implements OnInit {

  @Input() estados: any;

  paginationData: PaginationNumbers = {
    totalItems: 10,
    currentPage: 1,
    totalPages: 1,
    currentSubsetPages: []
  };

  constructor() { }

  ngOnInit(): void {
    this.calcularPagesNumber();
  }

  goToPageNumber(pageNumber: number){

  }

  calcularPagesNumber() {
    this.paginationData.totalItems = this.estados.length;
  }

}
