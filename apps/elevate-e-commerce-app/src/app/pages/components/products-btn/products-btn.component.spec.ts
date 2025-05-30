import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsBtnComponent } from './products-btn.component';

describe('ProductsBtnComponent', () => {
  let component: ProductsBtnComponent;
  let fixture: ComponentFixture<ProductsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
