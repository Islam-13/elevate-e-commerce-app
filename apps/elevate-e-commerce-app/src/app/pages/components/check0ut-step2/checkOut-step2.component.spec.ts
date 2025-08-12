import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckOutStep2Component } from './checkOut-step2.component';

describe('CheckOutStep2Component', () => {
  let component: CheckOutStep2Component;
  let fixture: ComponentFixture<CheckOutStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckOutStep2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckOutStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
