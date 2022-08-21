import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-main',
  templateUrl: './modal-main.component.html',
  styleUrls: ['./modal-main.component.css']
})
export class ModalMainComponent implements OnInit {

  @Input() title: string = "Modal Title";
  @Output() close = new EventEmitter();

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.addEventClose(this.close);
  }

  onClose(): void {
    this.close.emit();
  }

}
