import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactiveUserComponent } from './desactive-user.component';

describe('DesactiveUserComponent', () => {
  let component: DesactiveUserComponent;
  let fixture: ComponentFixture<DesactiveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesactiveUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesactiveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
