import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPage } from './form.page';
import { FormPageRoutingModule } from './form-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormPage]
})
export class FormPageModule { }
