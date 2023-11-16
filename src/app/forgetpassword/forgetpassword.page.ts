import { Component, OnInit, ViewChild } from '@angular/core';
import { ForgotpasswordService } from '../services/forgotpassword.service';
import { IonInput } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {
  @ViewChild('emailInput', { static: false }) emailInput!: IonInput;
  email!: string;
  emailFormControl: FormControl;
  showError: boolean = false;
  showErrorEmail: boolean = false;
  isModalOpenRest = false;




  constructor(private forgetPasswordService: ForgotpasswordService) { 
    this.email = '';
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  }

  ngOnInit() {
  }

  setOpenRest(isOpen: boolean) {
    this.isModalOpenRest = isOpen;
    // this.router.navigate(['/tabs/profile']);
  }

  resetPassword(email: string) {
    if (this.email.trim() === '') {
      this.showError = true;
      if (this.email) {
        this.emailInput.setFocus();
      }
    } else {
      this.showError = false;
      if(this.emailFormControl.invalid){
        this.showErrorEmail=true
      }else{
        this.forgetPasswordService.forgetpassword(email).subscribe();
        this.setOpenRest(true);
      }
      
      
    }
  }

}