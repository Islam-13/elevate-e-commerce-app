import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtrlErrComponent } from './ctrl-err.component';

describe('CtrlErrComponent', () => {
  let component: CtrlErrComponent;
  let fixture: ComponentFixture<CtrlErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlErrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtrlErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
