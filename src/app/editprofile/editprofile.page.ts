import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { UserDataService } from '../services/user-data.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Goal } from 'src/interfaces/goal.interface';
import { GoalsService } from '../services/goals.service';
import { ProfileImageService } from '../services/profile-image.service';
import { porfilePicture } from 'src/interfaces/porfilePicture';
import { LoadingService } from '../services/loading.service';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  goals!: Goal[];
  url = environment.url;

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
  datauserinserted !: GetDataUser;
  datauserprofileimage: porfilePicture = {
    profile_image: null
  };
  name !: string;
  isModalOpenmodif = false;
  selectedImageFile!: File; // Add this line to declare the selectedImageFile property
  isLoadingImage = true;
  constructor(
    private goalService: GoalsService,
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private formService: FormService,
    private userDataService: UserDataService,
    private profileImageService: ProfileImageService,
    private modalController: ModalController) { }
  isModalOpen = false;


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  setOpenmodif(isOpen: boolean) {
    this.isModalOpenmodif = isOpen;
    this.modalController.dismiss();

  }

  async ionViewWillEnter() {
    await this.fetchProfileImage(); // Call the method to fetch the profile image
  }

  async ngOnInit() {

    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      goal_id: new FormControl('', Validators.required),
    });

    await this.fetchProfileImage();

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {

      this.datauser = JSON.parse(storedUserData);
      this.name = this.datauser.name;
      const goalId = this.datauser.goal_id?.toString();
      this.contactForm.patchValue({
        name: this.datauser.name,
        phone: this.datauser.phone,
        password: this.datauser.password,
        gender: this.datauser.gender,
        goal_id: goalId
      });
    } else {
      await this.userDataService.GetData().subscribe((response: GetDataUser) => {
        this.datauser = response.data;
        this.name = this.datauser.name;
        const goalId = this.datauser.goal_id?.toString();
        this.contactForm.patchValue({
          name: this.datauser.name,
          phone: this.datauser.phone,
          password: response.data.password,
          gender: this.datauser.gender,
          goal_id: goalId
        });
        localStorage.setItem('userData', JSON.stringify(this.datauser)); // Store the user data in local storage
      });
    }

    await this.goalService.getGoals().subscribe((response: any) => {
      this.goals = response.data;
    });
  }

  saveUserProfile() {
    this.setOpenmodif(true);
    this.datauserinserted = this.contactForm.value;
    console.log(this.datauserinserted)
  }

  setProfileImageUrl() {
    // after edit profile we need to change ui avatar with new name in local storage with new image
    localStorage.removeItem('profileImage');
    if (this.selectedImageFile) {
      const formData = new FormData();
      formData.append('profile_image', this.selectedImageFile);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post(`${this.url}/api/users/profile-image`, formData, { headers })
        .subscribe((response: any) => {
          console.log(response);
          const profileImagePath = response.profile_image;
          localStorage.setItem('profileImage', profileImagePath);
        }, (error) => {
          // Handle error while uploading image
          console.log(error);
        });
    }

    this.datauserinserted = this.contactForm.value;
    this.formService.editprofile(this.datauserinserted).subscribe((response: GetDataUser) => {

      localStorage.setItem('userData', JSON.stringify(response.data));
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const name = userData.name;
        localStorage.setItem('name', name);
        localStorage.setItem('sharedname', name);

        this.router.navigate(['../profile'], { queryParams: { name: userData.name } });

      }
    });

    // i recieve data in response like this for  userData: 
    // {"status":true,"message":"User updated successfully","data":{"id":1,"name":"chabba","email":"user@user.com","gender":"male","form_status":1,"date_of_birth":"1444-12-14","role_id":1,"current_height":12,"current_weight":14,"phone":"111111111","goal_id":"2","target_weight":11111,"goal_status":null,"created_at":"2023-06-13T19:25:11.000000Z","updated_at":"2023-06-20T14:05:04.000000Z","deleted_at":null,"profile_image":"profile_images/nE8nwxdtVNSRQVCQiTPifJsUpZktAV5ivcR6B4Nu.jpg"}}

    this.setOpenmodif(true);


  }

  async fetchProfileImage() {
    try {
      const storedProfileImage = localStorage.getItem('profileImage');
      if (storedProfileImage) {

        this.datauserprofileimage.profile_image = storedProfileImage;
      } else {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const response = await this.http.get<any>(`${this.url}/api/users/profile-image`, { headers }).toPromise();
        if (response.profile_image === 'https://ui-avatars.com/api/?name=') {
          const modifiedProfileImage = response.profile_image + encodeURIComponent(this.name); // Add this.name to the profileImage URL
          localStorage.setItem('profileImage', modifiedProfileImage); // Store the modified profileImage in local storage
          this.datauserprofileimage.profile_image = modifiedProfileImage;
        } else {
          this.datauserprofileimage.profile_image = response.profile_image;
          localStorage.setItem('profileImage', response.profile_image);
        }
        // Store the profile image URL in local storage
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  }

  // Handle the file change event
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedImageFile = file;
  }


}






