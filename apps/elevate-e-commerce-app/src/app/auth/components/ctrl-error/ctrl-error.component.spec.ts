import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtrlErrorComponent } from './ctrl-error.component';

describe('CtrlErrorComponent', () => {
  let component: CtrlErrorComponent;
  let fixture: ComponentFixture<CtrlErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtrlErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtrlErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
