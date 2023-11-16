import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealCategoryPage } from './meal-category.page';

describe('MealCategoryPage', () => {
  let component: MealCategoryPage;
  let fixture: ComponentFixture<MealCategoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MealCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
