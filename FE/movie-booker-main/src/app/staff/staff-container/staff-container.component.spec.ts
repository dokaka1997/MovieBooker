/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffContainerComponent } from './staff-container.component';

describe('StaffContainerComponent', () => {
  let component: StaffContainerComponent;
  let fixture: ComponentFixture<StaffContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
