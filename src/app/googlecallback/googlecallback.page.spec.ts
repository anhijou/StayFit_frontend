import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GooglecallbackPage } from './googlecallback.page';

describe('GooglecallbackPage', () => {
  let component: GooglecallbackPage;
  let fixture: ComponentFixture<GooglecallbackPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GooglecallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
