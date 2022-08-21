import { Component, Input, OnInit } from '@angular/core';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';

@Component({
  selector: 'app-accordion-acessos',
  templateUrl: './accordion-acessos.component.html',
  styleUrls: ['./accordion-acessos.component.css']
})
export class AccordionAcessosComponent implements OnInit {

  @Input() processoId: any;
  @Input() users: any;
  processAcess: any;

  showAddUserModal = false;
  showDeleteUserModal = false;

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
    this.paginationData.totalItems = this.users.length;
  }

  deleteUser(user: any){
    this.processAcess = {
      processoId: this.processoId,
      user
    };
    this.showDeleteUserModal = true;
  }

  closeModal(){
    this.showAddUserModal = false;
    this.showDeleteUserModal = false;
  }

}
