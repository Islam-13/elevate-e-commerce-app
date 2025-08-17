import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetPasswordStepsComponent } from './forget-password-steps.component';

describe('ForgetPasswordStepsComponent', () => {
  let component: ForgetPasswordStepsComponent;
  let fixture: ComponentFixture<ForgetPasswordStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPasswordStepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
