import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import { UserDataService } from '../services/user-data.service';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { GoogleService } from '../services/google.service';
import { CountryData } from 'src/interfaces/CountryResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registerdata } from 'src/interfaces/registerdata';
import { porfilePicture } from 'src/interfaces/porfilePicture';
import { ProfileImageService } from '../services/profile-image.service';
import { LoadingService } from '../services/loading.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss', './registration.page2.scss'],
})
export class RegistrationPage implements OnInit {
  passreq: String = 'password ';
  UserRegisterForm!: FormGroup;
  public alertButtons = ['OK'];
  authUrl !: any;
  dialCodes: any;
  Alertmessage: string = "";
  selectedDialCode: any;
  data: any;
  showErrorName:boolean=false;
  showErrorEmail:boolean=false;
  showErrorPhone:boolean=false;
  showErrorPassword:boolean=false;
  showErrorCountryCode:boolean=false;
  isFormValid: boolean = false;
  datauserprofileimage: porfilePicture = {
    profile_image: null
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private formService: FormService,
    private userDataService: UserDataService,
    private googleService: GoogleService,
    private http: HttpClient,
    private profileImageService: ProfileImageService,
    private loadingService: LoadingService,
  ) {

    this.fetchAuthUrl();

  }

 



  async fetchAuthUrl() {
    this.googleService.getAuthUrl().subscribe(response => { this.authUrl = response });
  }

  onSelectChange() {
    console.log(this.selectedDialCode);
  }
  getData() {
    const apiUrl = 'https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/CountryCodes.json';
    this.http.get(apiUrl).subscribe(data => {
      console.log(data)
      this.dialCodes = data;
    });
  }
  
  async changeOrNotPage() {
    this.showErrorName=true;
    this.showErrorEmail=true;
    this.showErrorPhone=true;
    this.showErrorPassword=true;
    this.showErrorCountryCode =true;
    if (this.UserRegisterForm.valid) {
       this.register();
    } 
  }



  ngOnInit() {

    this.getData();
    // Initialize the user registration form with form controls and validators
    this.UserRegisterForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')]],
      Phone: ['', [Validators.required, Validators.minLength(6), Validators.pattern('[0-9]+')]],
      Email: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      Password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])[a-zA-Z0-9@-]{8,}$')]],
      role_id: 2,
      CountryCode: ['', Validators.required],

    });
  }


 


  async register() {
    
    let loading: any;
    try {
      // Show the loading spinner
      //loading = await this.loadingService.presentLoadingDynamic();

      const phone = this.UserRegisterForm.value.CountryCode + this.UserRegisterForm.value.Phone;

      const registerdta: registerdata = {
        name: this.UserRegisterForm.value.Name,
        email: this.UserRegisterForm.value.Email,
        phone: phone,
        password: this.UserRegisterForm.value.Password,
        role_id: 2
      };

      // Call the registration service to register the user
      const response: any = await this.authService.register(registerdta).toPromise();

      if (response.status === true) {
        // If registration is successful, save the token in local storage
        localStorage.setItem('token', response.token);

        this.formService.tokenuser = response.token;

        const userDataResponse: GetDataUser | undefined = await this.userDataService.GetData().toPromise();
        if (userDataResponse) {
          this.formService.iduser = userDataResponse.data.id;
          localStorage.setItem('iduser', userDataResponse.data.id);
          this.userDataService.alldata = userDataResponse.data;

          localStorage.setItem('userData', JSON.stringify(userDataResponse.data)); // Store the user data in local storage
          const userDataString = localStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            const name = userData.name;
            await this.profileImageService.fetchProfileImage(name);
            localStorage.setItem('name', name);
          }
        } else {
          // Handle the case when userDataResponse is undefined
        }

        // Navigate to the form page
        this.router.navigate(['/form']).then(() => {
          // Dismiss the loading spinner when the form page is loaded
          loading.dismiss();
        });
      } else {
        // Handle registration error, display a message, etc.
      }
    } catch (error: any) {
     // setTimeout(() => {
        // Handle registration error, display a message, etc.
        const formattedErrorMessages = [];

        // Loop through the errors object
        for (const key in error.error.errors) {
          if (error.error.errors.hasOwnProperty(key)) {
            // Check if the property is undefined
            if (typeof error.error.errors[key] !== 'undefined') {
              // Format the error message with the index
              const errorMessage = ` ${error.error.errors[key][0]}`;
              // Push the formatted error message to the array
              formattedErrorMessages.push(errorMessage);
              // Increment the index
            }
          }
        }

        this.Alertmessage = formattedErrorMessages.join(' also ');
        //this.setOpenError(true);

       // loading.dismiss();
     // }, 100); // Adjust the delay as needed
    }
  }


}
