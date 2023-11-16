import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealCategoryPage } from './meal-category.page';

const routes: Routes = [
  {
    path: '',
    component: MealCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealCategoryPageRoutingModule {}
