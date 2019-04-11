import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInStep1Component } from './sign-in-step1.component';

describe('SignInStep1Component', () => {
  let component: SignInStep1Component;
  let fixture: ComponentFixture<SignInStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
