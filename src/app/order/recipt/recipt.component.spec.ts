import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptComponent } from './recipt.component';

describe('ReciptComponent', () => {
  let component: ReciptComponent;
  let fixture: ComponentFixture<ReciptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReciptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
