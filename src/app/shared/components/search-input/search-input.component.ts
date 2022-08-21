import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true
    }
  ]
})
export class SearchInputComponent implements ControlValueAccessor, OnChanges {

  @Input() placeHolder: string = '';
  @Input() isSmallSize = false;
  @Input('messageValue') _messageValue = '';

  constructor() {}

  propagateChange: any = () => {};

  get messageValue() {
    return this._messageValue;
  }

  set messageValue(val) {
    this._messageValue = val;
    this.propagateChange(val);
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

  registerOnTouched() {}

}
