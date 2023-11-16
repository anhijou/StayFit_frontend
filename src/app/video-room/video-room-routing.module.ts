import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoRoomPage } from './video-room.page';

const routes: Routes = [
  {
    path: '',
    component: VideoRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoomPageRoutingModule {}
