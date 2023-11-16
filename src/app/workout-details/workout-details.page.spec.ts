import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutDetailsPage } from './workout-details.page';

describe('WorkoutDetailsPage', () => {
  let component: WorkoutDetailsPage;
  let fixture: ComponentFixture<WorkoutDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkoutDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
