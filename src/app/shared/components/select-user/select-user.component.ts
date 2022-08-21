import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectUser } from './select-user.model';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectUserComponent),
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
export class SelectUserComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {

  @Input() placeHolder = "Titulo do Select";
  @Input() isSmallSize = false;
  @Input() isLoading: any;
  @Input() disabled = false;
  @Input('messageValue') _messageValue!: string[];
  @Input() list: SelectUser[] = [
    {id: '', primeiroNome: 'Ivovacao', ultimoNome: '1', checked: false}
  ];

  @Output() reload = new EventEmitter();

  isDropped = false;
  totalChecked = 0;
  placeHolderBackup = "";

  constructor() { }

  ngOnInit(): void {
    this.placeHolderBackup = this.placeHolder;
  }

  propagateChange: any = () => {};

  get messageValue() {
    return this._messageValue;
  }

  set messageValue(val: string[]) {
    this._messageValue = val;
    this.propagateChange(val);
  }

  ngOnChanges(changes: any) {
    this.propagateChange(this.messageValue);
  }

  writeValue(value: string[]) {
    if (value) {
      this.messageValue = value;
    }
    else{
      this.messageValue = [];
      this.placeHolder = this.placeHolderBackup;
    }
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

  selecionar(item: SelectUser){
    if (item.checked){
      this.totalChecked -= 1;
      if (this.totalChecked > 0){
        this.placeHolder = this.placeHolderBackup + '(' + this.totalChecked + ')';
      }
      else{
        this.placeHolder = this.placeHolderBackup;
      }
      item.checked = false;
      this.messageValue = this.messageValue.filter(t => t !== item.id);
    }
    else{
      this.totalChecked += 1;
      if (this.placeHolder == this.placeHolderBackup) {
        this.placeHolder = item.primeiroNome + ' ' + item.ultimoNome;
      }
      else {
        this.placeHolder = this.placeHolderBackup + '(' + this.totalChecked + ')';
      }
      item.checked = true;
      this.messageValue = [ ...this.messageValue, item.id ];
    }

    this.propagateChange(this.messageValue);
    console.log('item: ', this.messageValue);
    //this.isDropped = false;
  }

  ngOnDestroy(): void {
    this.list.filter(x => x.checked == true).map(item => {item.checked = false});
    this.propagateChange([]);
  }

  reloadContent(){
    this.reload.emit()
  }

}
