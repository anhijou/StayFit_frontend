import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EditprofilePage } from './editprofile.page';

describe('EditprofilePage', () => {
  let component: EditprofilePage;
  let fixture: ComponentFixture<EditprofilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
