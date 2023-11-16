import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsPageRoutingModule
  ],
  declarations: [MealsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MealsPageModule {}
