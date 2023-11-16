import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetpasswordPageRoutingModule } from './forgetpassword-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgetpasswordPage } from './forgetpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetpasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForgetpasswordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForgetpasswordPageModule { }
