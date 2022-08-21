import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    }
  ]
})
export class EmailInputComponent implements ControlValueAccessor, OnChanges {

  @Input() placeHolder: string = '';
  @Input() sufix: string = '@maptss.gov.ao';
  @Input() isSmallSize = false;
  @Input() disabled = false;
  @Input('messageValue') _messageValue = '';

  constructor() {}

  propagateChange: any = () => {};

  get messageValue() {
    return this._messageValue;
  }

  set messageValue(val) {
    this._messageValue = val;
    this.propagateChange(val + this.sufix);
  }

  ngOnChanges(changes: any) {
    this.propagateChange(this.messageValue + this.sufix);
  }

  writeValue(value: string) {
    if (value) {
      this.validarString(value);
    } else {
      this.messageValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  onKeyUp(event: any){
    this.validarString(event.target.value);
  }

  validarString(val: string){
    if (val.includes('@')) {
      const emailCharacter = val.substring(val.indexOf('@'), val.length);
      this.messageValue = val.replace(emailCharacter, '');
    }
  }

}
