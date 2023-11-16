import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleService } from '../services/google.service';
import { FormService } from '../services/form.service';
import { FormBuilder } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { ProfileImageService } from '../services/profile-image.service';

@Component({
  selector: 'app-googlecallback',
  templateUrl: './googlecallback.page.html',
  styleUrls: ['./googlecallback.page.scss'],
})
export class GooglecallbackPage implements OnInit {
  auth_code!: any;
  progress = 0.5;
  buffer = 0.75;
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
  constructor(
    private googleService: GoogleService,
    private router: Router,
    private fb: FormBuilder,
    private formService: FormService,
    private profileImageService: ProfileImageService,
    private userDataService: UserDataService) {
  }

  ngOnInit() {
    // Get the current URL
    const authUrl = window.location.href;
    const url = new URL(authUrl);
    const queryParams = new URLSearchParams(url.search);
    const code = queryParams.get('code');
    this.auth_code = code;
    console.log(this.auth_code); // authcode example :  "4/0AbUR2VMEeyTL2INfUUgZ_COCOLzqf0cAJyKSclzIKxQYDhH61kx1cGN1wHC0lMgppy1Z4g"

    this.LoginGoogle();

  }

  // method that Log in or Register a new user with Google 
  LoginGoogle() {
    this.googleService.Login_Google(this.auth_code).subscribe(
      async (response: any) => {
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

          this.formService.tokenuser = response.token;
          this.userDataService.token = response.token;
          this.userDataService.GetData().subscribe((response: GetDataUser) => {
            this.formService.iduser = response.data.id;
            localStorage.setItem('iduser', response.data.id);


            if (response.data.form_status === 1) {
              this.router.navigate(['/dashboard']);
              console.log(response.data)
            }

            else {
              this.router.navigate(['/form']);
            }
          });

        } else {

          // Handle  error, display a message, etc.
        }
      },
      (error) => {

        // Handle login error, display a message, etc.
      }
    );
  }

}



