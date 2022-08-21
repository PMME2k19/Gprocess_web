import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  animations: [
    trigger('toggleHeight', [
      state('hide', style({
          height: '0',
          opacity: '0',
          overflow: 'hidden'
      })),
      state('show', style({
          height: '*',
          padding: '1.25rem',
          opacity: '1'
      })),
      transition('hide => show', animate('200ms ease-in')),
      transition('show => hide', animate('200ms ease-out'))
    ])
  ]
})
export class AccordionComponent implements OnInit {

  @Input() titulo: string = 'Titulo Accordion';
  @Input() isOpen = false;
  @Input() isLast = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleAccordion(){
    this.isOpen = !this.isOpen;
  }

}
