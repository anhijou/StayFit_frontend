import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealCategoryPageRoutingModule } from './meal-category-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MealCategoryPage } from './meal-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealCategoryPageRoutingModule
  ],
  declarations: [MealCategoryPage], 
   schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class MealCategoryPageModule {}
