import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegestrationComponent } from './regestration.component';

describe('RegestrationComponent', () => {
  let component: RegestrationComponent;
  let fixture: ComponentFixture<RegestrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegestrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
