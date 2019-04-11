import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppigSidebarComponent } from './shoppig-sidebar.component';

describe('ShoppigSidebarComponent', () => {
  let component: ShoppigSidebarComponent;
  let fixture: ComponentFixture<ShoppigSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppigSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppigSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
