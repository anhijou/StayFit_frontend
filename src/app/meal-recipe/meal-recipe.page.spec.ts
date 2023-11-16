import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealRecipePage } from './meal-recipe.page';

describe('MealRecipePage', () => {
  let component: MealRecipePage;
  let fixture: ComponentFixture<MealRecipePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MealRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
