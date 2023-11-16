import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GooglecallbackPage } from './googlecallback.page';

const routes: Routes = [
  {
    path: '',
    component: GooglecallbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GooglecallbackPageRoutingModule {}
