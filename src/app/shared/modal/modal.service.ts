import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {

  @Output() private close = new EventEmitter();

  constructor() { }

  addEventClose(event: EventEmitter<any>): void{
    this.close = event;
  }

  closeModal(): void{
    this.close.emit();
  }

}
