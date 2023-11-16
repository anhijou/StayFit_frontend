import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { WorkoutCategoryPageRoutingModule } from './workout-category-routing.module';

import { WorkoutCategoryPage } from './workout-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutCategoryPageRoutingModule
  ],
  declarations: [WorkoutCategoryPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class WorkoutCategoryPageModule {}
