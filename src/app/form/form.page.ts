import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from 'src/interfaces/userData';
import { FormService } from '../services/form.service';
import { ModalController } from '@ionic/angular';

import { GoalsService } from '../services/goals.service';
import { Goal } from 'src/interfaces/goal.interface';
import { LoadingService } from '../services/loading.service';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss']
})
export class FormPage implements OnInit {
  @ViewChild('item', { static: false }) itemRef!: any;

  goals!: Goal[];
  selectedOption = 'female';
  userDataForm !: FormGroup;
  radioValue: string = 'unknown';
  isModalOpen = false;
  pageCondition1: number = 0;
  changePageClicked = false;
  datauser: GetDataUser = {
    profile_image: null,
    data: undefined,
    id: 0,
    name: '',
    email: '',
    gender: null,
    form_status: 0,
    date_of_birth: null,
    role_id: 0,
    current_height: null,
    current_weight: null,
    phone: null,
    goal_id: null,
    target_weight: null,
    goal_status: null,
    created_at: '',
    updated_at: '',
    deleted_at: null,
    password: null,
    profileImagePath: null
  };
  contactForm !: FormGroup;

  showErrorheight: boolean = false;
  showErrorweight: boolean = false;
  showErrortarget: boolean = false;
  showErrordate: boolean = false;



  async RegistrationComplete() {

    await this.loadingService.presentLoading(1200);
    this.modalController.dismiss();
    this.router.navigate(['../dashboard']);
  }


  constructor(
    private goalService: GoalsService,
    private fb: FormBuilder,
    private userDataService: UserDataService,

    private formService: FormService,
    private renderer: Renderer2,
    private modalController: ModalController,
    private router: Router,
    private loadingService: LoadingService) { }


  ngOnInit(): void {
    // Initialize the userDataForm FormGroup with form controls
    this.userDataForm = this.fb.group({
      'gender': ['', [Validators.required]],   // gender form control
      'current_height': ['', [Validators.required]],      // Weight form control
      'current_weight': ['', [Validators.required]],       // Height form control
      'goal_id': ['', [Validators.required]],      // Goal form control with initial value as empty array
      'date_of_birth': ['', [Validators.required,]],          // age form control
      'form_status': true, // Formstatus form control with initial value as true
      'target_weight': ['', [Validators.required]]
    });

    // retrive goals from back end for show them in the Form Page
    this.goalService.getGoals().subscribe((response: any) => {
      this.goals = response.data;
    });
  }

  // Increment the pageCondition1 by one
  async changePage(ty: string) {
    //await this.loadingService.presentLoading(500);
    this.showerrur(true);
    if (!this.userDataForm.get(ty)?.invalid) {
      this.showErrordate = false;
      if (ty === 'date_of_birth') {
        if (this.userDataForm.get('target_weight')?.valid
          || this.userDataForm.value.target_weight != '') {
          this.showErrortarget = false;
        }

        if (this.userDataForm.get('current_weight')?.valid
          || this.userDataForm.value.current_weight != '') {
          this.showErrorweight = false;
        }

        if (this.userDataForm.get('current_height')?.valid
          || this.userDataForm.value.current_height != '') {
          this.showErrorheight = false;
        }


        if (this.showErrorheight == false &&
          this.showErrorweight == false &&
          this.showErrortarget == false &&
          this.showErrordate == false &&
          this.userDataForm.value.target_weight != this.userDataForm.value.current_height) {
          // messsage the target weight must be different to your current wieght
          this.pageCondition1++;
        }


      } else {

        this.showErrorheight = false;
        this.showErrorweight = false;
        this.showErrortarget = false;
        this.showErrordate = false;
        this.changePageClicked = false;
        this.pageCondition1++;
      }
    }
  }

  showerrur(errur: boolean) {
    this.showErrortarget = errur;
    this.showErrorheight = errur;
    this.showErrorweight = errur;
    this.showErrordate = errur;
  }

  setGoal(goal: number) {
    // Set the value of the Goal form control to the selected goal
    this.userDataForm.patchValue({
      goal_id: goal
    });

    this.isModalOpen = true;
    //this code to send data to db...
    const userData: userData = {
      gender: this.userDataForm.value.gender,
      date_of_birth: this.userDataForm.value.date_of_birth,
      current_weight: this.userDataForm.value.current_weight,
      current_height: this.userDataForm.value.current_height,
      goal_id: this.userDataForm.value.goal_id,
      target_weight: this.userDataForm.value.target_weight,
      form_status: 1
    };

    this.formService.formupdate(userData).subscribe(
      async (response: any) => {

        if (response.message === "User updated successfully") {
          await this.userDataService.GetData().subscribe((response: GetDataUser) => {
            this.datauser = response.data;
            localStorage.setItem('userData', JSON.stringify(this.datauser));

            // Store the user data in local storage
          });


          // this.router.navigate(['/dashboard']);
        } else {
          // Handle  error, display a message, etc.
        }
      },
      (error) => {
        // Handle  error, display a message, etc.
      }
    );






  }

}