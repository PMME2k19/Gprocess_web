import { Component, Input, OnInit } from '@angular/core';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';

@Component({
  selector: 'app-accordion-reunioes',
  templateUrl: './accordion-reunioes.component.html',
  styleUrls: ['./accordion-reunioes.component.css']
})
export class AccordionReunioesComponent implements OnInit {

  @Input() reunioes: any;

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
    this.paginationData.totalItems = this.reunioes.length;
  }

}
