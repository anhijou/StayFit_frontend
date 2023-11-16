import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VideoRoomPageRoutingModule } from './video-room-routing.module';

import { VideoRoomPage } from './video-room.page';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoRoomPageRoutingModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  declarations: [VideoRoomPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VideoRoomPageModule {}
