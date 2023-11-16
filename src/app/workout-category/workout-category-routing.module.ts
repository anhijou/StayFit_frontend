import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutCategoryPage } from './workout-category.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class WorkoutCategoryPageRoutingModule {}
