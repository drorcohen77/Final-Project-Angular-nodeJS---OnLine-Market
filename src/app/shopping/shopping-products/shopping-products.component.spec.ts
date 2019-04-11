import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingProductsComponent } from './shopping-products.component';

describe('ShoppingProductsComponent', () => {
  let component: ShoppingProductsComponent;
  let fixture: ComponentFixture<ShoppingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
