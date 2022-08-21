import { Component, Input, forwardRef, HostBinding, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor, OnChanges {

  @Input() titulo: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input('messageValue') _messageValue = '';

  constructor() {}

  propagateChange: any = () => {};
  onTouched: any = () => {};

  get messageValue() {
    return this._messageValue;
  }

  set messageValue(val) {
    this._messageValue = val;
    this.propagateChange(val);
    this.onTouched(val);
  }

  ngOnChanges(changes: any) {
    this.propagateChange(this.messageValue);
  }

  writeValue(value: string) {
    this.messageValue = value;
  }


  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
