import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInStep2Component } from './sign-in-step2.component';

describe('SignInStep2Component', () => {
  let component: SignInStep2Component;
  let fixture: ComponentFixture<SignInStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
