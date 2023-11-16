import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealRecipePage } from './meal-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: MealRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealRecipePageRoutingModule {}
