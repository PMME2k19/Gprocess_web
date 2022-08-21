import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassToResetComponent } from './update-pass-to-reset.component';

describe('UpdatePassToResetComponent', () => {
  let component: UpdatePassToResetComponent;
  let fixture: ComponentFixture<UpdatePassToResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePassToResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePassToResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
