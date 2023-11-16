import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GooglecallbackPageRoutingModule } from './googlecallback-routing.module';

import { GooglecallbackPage } from './googlecallback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglecallbackPageRoutingModule
  ],
  declarations: [GooglecallbackPage]
})
export class GooglecallbackPageModule {}
