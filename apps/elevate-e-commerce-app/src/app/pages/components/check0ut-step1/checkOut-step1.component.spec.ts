import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckOutStep1Component } from './checkOut-step1.component';

describe('CheckOutStep1Component', () => {
  let component: CheckOutStep1Component;
  let fixture: ComponentFixture<CheckOutStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOutStep1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckOutStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
