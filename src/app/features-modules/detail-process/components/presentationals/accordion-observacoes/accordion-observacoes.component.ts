import { Component, Input, OnInit } from '@angular/core';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';

@Component({
  selector: 'app-accordion-observacoes',
  templateUrl: './accordion-observacoes.component.html',
  styleUrls: ['./accordion-observacoes.component.css']
})
export class AccordionObservacoesComponent implements OnInit {

  @Input() observacoes: any;

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
    this.paginationData.totalItems = this.observacoes.length;
  }

}
