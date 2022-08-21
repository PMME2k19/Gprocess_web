import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassFirstComponent } from './update-pass-first.component';

describe('UpdatePassFirstComponent', () => {
  let component: UpdatePassFirstComponent;
  let fixture: ComponentFixture<UpdatePassFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePassFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePassFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
