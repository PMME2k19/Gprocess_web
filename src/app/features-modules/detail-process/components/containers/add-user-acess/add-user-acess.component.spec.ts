import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAcessComponent } from './add-user-acess.component';

describe('AddUserAcessComponent', () => {
  let component: AddUserAcessComponent;
  let fixture: ComponentFixture<AddUserAcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
