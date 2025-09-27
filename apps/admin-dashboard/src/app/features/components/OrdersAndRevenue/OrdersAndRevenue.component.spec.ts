import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersAndRevenueComponent } from './OrdersAndRevenue.component';

describe('OrdersAndRevenueComponent', () => {
  let component: OrdersAndRevenueComponent;
  let fixture: ComponentFixture<OrdersAndRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAndRevenueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersAndRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
