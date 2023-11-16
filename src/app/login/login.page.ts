import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { UserDataService } from '../services/user-data.service';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { GoogleService } from '../services/google.service';
import { LoadingService } from '../services/loading.service';
import { porfilePicture } from 'src/interfaces/porfilePicture';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileImageService } from '../services/profile-image.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', './login.page1.scss'],
})
export class LoginPage implements OnInit {
  auth_code!: any;
  emailInputValue: string = '';
  UserLoginForm !: FormGroup;
  public alertButtons = ['OK'];
  isAlertOpen = false;
  authUrl !: string;
  Alertmessage!: string;
  isModalOpenError = false;
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
  datauserprofileimage: porfilePicture = {
    profile_image: null
  };
  constructor(private loadingService: LoadingService, private profileImageService: ProfileImageService, private http: HttpClient, private googleService: GoogleService, private authService: AuthService, private router: Router, private fb: FormBuilder, private formService: FormService, private userDataService: UserDataService) {

    this.fetchAuthUrl();
  }


  setOpenError(isOpen: boolean) {
    this.isModalOpenError = isOpen;
  }

  async fetchAuthUrl() {
    this.googleService.getAuthUrl().subscribe(response => { this.authUrl = response });
  }


  async ngOnInit() {
    // Initialize the login form with validators
    this.UserLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required]]

    });

  }

  async login() {
    let loading: any;
    try {
      // Show the loading spinner
      loading = await this.loadingService.presentLoadingDynamic();

      const response: any = await this.authService.login(this.UserLoginForm.value.email, this.UserLoginForm.value.password).toPromise();

      if (response.status === true) {

        localStorage.setItem('token', response.token);

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          this.datauser = JSON.parse(storedUserData);
          const goalId = this.datauser.goal_id?.toString();
        } else {

          const userDataResponse: GetDataUser | undefined = await this.userDataService.GetData().toPromise();

          this.datauser = userDataResponse?.data;
          const goalId = this.datauser?.goal_id?.toString() || '';
          localStorage.setItem('userData', JSON.stringify(this.datauser || {}));

          const userDataString = localStorage.getItem('userData');

          if (userDataString) {
            const userData = JSON.parse(userDataString);
            const name = userData.name;
            await this.profileImageService.fetchProfileImage(name);
            localStorage.setItem('name', name);
          }
        }

        const userDataResponse: GetDataUser | undefined = await this.userDataService.GetData().toPromise();
        if (userDataResponse) {
          this.formService.iduser = userDataResponse.data.id;
          localStorage.setItem('iduser', userDataResponse.data.id);

          if (userDataResponse.data.form_status === 1) {
            // Upon successful login, navigate to the dashboard
            this.router.navigate(['../dashboard']).then(() => {
              // Dismiss the loading spinner when the dashboard page is loaded
              loading.dismiss();
            });
          } else {
            this.router.navigate(['../form']).then(() => {
              // Dismiss the loading spinner when the form page is loaded
              loading.dismiss();
            });
          }
        } else {
          // Handle the case when userDataResponse is undefined
        }
      }
    } catch (error: any) {
      setTimeout(() => {
        this.setOpenError(true);
        this.Alertmessage = error?.error?.message || 'An error occurred during login';

        // Handle login error, display a message, etc.
        loading.dismiss();
      }, 100); // Adjust the delay as needed
    }
  }

}


