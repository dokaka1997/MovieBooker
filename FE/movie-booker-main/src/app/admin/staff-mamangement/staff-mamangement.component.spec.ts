/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffMamangementComponent } from './staff-mamangement.component';

describe('StaffMamangementComponent', () => {
  let component: StaffMamangementComponent;
  let fixture: ComponentFixture<StaffMamangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffMamangementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMamangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
