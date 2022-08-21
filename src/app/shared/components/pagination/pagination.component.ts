import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { PaginationNumbers } from 'src/app/base-models/base/pagination-numbers.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() paginationData: PaginationNumbers = {
    //default
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    currentSubsetPages: []
  };
  @Output() pageNumberEvent = new EventEmitter<number>();
  isFirtPageActive: boolean = true;
  isLastPageActive: boolean = true;
  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.updatePagination();
  }

  updatePagination(){
    if(this.paginationData.totalPages <= 5){
      for(let i = 1; i <= this.paginationData.totalPages; i++){
        this.paginationData.currentSubsetPages.push(i);
      }
    }else{
      if( this.paginationData.currentPage >= 1 ){
        for(let i = this.paginationData.currentPage; i <= this.paginationData.totalPages; i++){
          this.paginationData.currentSubsetPages.push(i);
          if(this.paginationData.currentSubsetPages.length == 5) break;
        }
        while(this.paginationData.currentSubsetPages.length < 5){
          this.paginationData.currentSubsetPages.unshift(this.paginationData.currentSubsetPages[0] - 1)
        }
      }
    }

    console.log(this.paginationData);

    if(this.paginationData.currentPage == 1) this.isFirtPageActive = false;
    else this.isFirtPageActive = true;
    if(this.paginationData.currentPage == this.paginationData.totalPages) this.isLastPageActive = false;
    else this.isLastPageActive = true;

    console.log(this.isFirtPageActive);
    console.log(this.isLastPageActive);
  }

  goToFirstPage(){
    this.goToPageNumber(1);
  }

  goToEndPage(){
    this.goToPageNumber(this.paginationData.totalPages);
  }

  goToPreviewPage(){
    this.goToPageNumber(this.paginationData.currentPage - 1);
  }

  goToNextPage(){
    this.goToPageNumber(this.paginationData.currentPage + 1);  
  }

  goToPageNumber(pageNumber: number){
    this.pageNumberEvent.emit(pageNumber);  
  }

}
