import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPasswordErrComponent } from './confirm-password-err.component';

describe('ConfirmPasswordErrComponent', () => {
  let component: ConfirmPasswordErrComponent;
  let fixture: ComponentFixture<ConfirmPasswordErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPasswordErrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmPasswordErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
