import { Component, Input, forwardRef, HostBinding, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor, OnChanges {

  @Input() titulo: string = '';
  @Input('messageValue') _messageValue = false;
  @Input() formControlName: FormControl = new FormControl('');

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

  writeValue(value: boolean) {
    this.messageValue = value;
  }


  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
