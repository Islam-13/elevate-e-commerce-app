import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureHeadingComponent } from './feature-heading.component';

describe('FeatureHeadingComponent', () => {
  let component: FeatureHeadingComponent;
  let fixture: ComponentFixture<FeatureHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureHeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
