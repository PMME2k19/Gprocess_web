import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion-dados-documento',
  templateUrl: './accordion-dados-documento.component.html',
  styleUrls: ['./accordion-dados-documento.component.css']
})
export class AccordionDadosDocumentoComponent implements OnInit {

  @Input() process: any;

  constructor() { }

  ngOnInit(): void {
  }

}
