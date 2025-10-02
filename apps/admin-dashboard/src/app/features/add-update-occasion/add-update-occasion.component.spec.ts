import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateOccasionComponent } from './add-update-occasion.component';

describe('AddUpdateOccasionComponent', () => {
  let component: AddUpdateOccasionComponent;
  let fixture: ComponentFixture<AddUpdateOccasionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateOccasionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateOccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
