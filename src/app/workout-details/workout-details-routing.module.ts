import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutDetailsPage } from './workout-details.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutDetailsPageRoutingModule {}
