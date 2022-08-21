import { Component, Input, forwardRef, OnChanges, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SelectInput } from './select-input.model';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ],
  animations: [
    trigger('toggleHeight', [
      state('hide', style({
          height: '0px',
          opacity: '0',
          overflow: 'hidden'
      })),
      state('show', style({
          height: '*',
          opacity: '1'
      })),
      transition('hide => show', animate('200ms ease-in')),
      transition('show => hide', animate('200ms ease-out'))
    ])
  ],
})
export class SelectInputComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit {

  NULL_ITEM = -1;

  @ViewChild("select") select!: ElementRef;

  @Input() placeHolder = "Titulo do Select";
  @Input() isSmallSize = false;
  @Input() isLoading: any;
  @Input() disabled = false;
  @Input('messageValue') _messageValue!: SelectInput | null;
  @Input() list: SelectInput[] = [
    {id: 1, nome: 'Ivovacao'},
    {id: 2, nome: 'Ivovacao 2'},
    {id: 3, nome: 'Ivovacao 3'}
  ];

  @Output() reload = new EventEmitter();

  activeItem!: SelectInput;
  isDropped = false;
  placeHolderBackup = "";

  constructor() { }

  ngOnInit(): void {
    this.placeHolderBackup = this.placeHolder;
  }

  ngAfterViewInit(): void {
    const selectElement = this.select.nativeElement;
    selectElement.style = 'min-width: ' + selectElement.offsetWidth + 'px;';
  }

  propagateChange: any = () => {};

  get messageValue() {
    return this._messageValue;
  }

  set messageValue(val: SelectInput | null) {
    this._messageValue = val;
    this.propagateChange(val);
  }

  ngOnChanges(changes: any) {
    if(changes.list){
      this.list = changes.list.currentValue;
      this.list.unshift({id: -1, nome: this.placeHolder});
    }
    else{
      this.propagateChange(this.messageValue);
    }
  }

  writeValue(value: SelectInput) {
    this.selecionar(value);
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  showDrop(){
    this.isDropped = true;
  }

  hideDrop(){
    this.isDropped = false;
  }

  selecionar(item: SelectInput){
    if (item) {
      this.changeActiveItem(item);
    }
    else {
      this.changeActiveItem(this.list[0]);
    }

    this.isDropped = false;
  }

  changeActiveItem(item: SelectInput){
    this.placeHolder = item.nome;
    this.activeItem = item;

    if(item.id == this.NULL_ITEM){
      this.messageValue = null;
    }
    else{
      this.messageValue = item;
    }
  }

  reloadContent(){
    this.reload.emit()
  }

}
