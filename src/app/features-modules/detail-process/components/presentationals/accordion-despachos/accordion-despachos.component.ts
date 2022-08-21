import { Component, Input, OnInit } from '@angular/core';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';

@Component({
  selector: 'app-accordion-despachos',
  templateUrl: './accordion-despachos.component.html',
  styleUrls: ['./accordion-despachos.component.css']
})
export class AccordionDespachosComponent implements OnInit {

  @Input() despachos: any;

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
    this.paginationData.totalItems = this.despachos.length;
  }

}
