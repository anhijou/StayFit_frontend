import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealRecipePageRoutingModule } from './meal-recipe-routing.module';

import { MealRecipePage } from './meal-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealRecipePageRoutingModule
  ],
  declarations: [MealRecipePage]
})
export class MealRecipePageModule {}
