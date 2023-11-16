import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetpasswordPage } from './forgetpassword.page';

describe('ForgetpasswordPage', () => {
  let component: ForgetpasswordPage;
  let fixture: ComponentFixture<ForgetpasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgetpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
