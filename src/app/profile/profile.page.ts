import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { UserDataService } from '../services/user-data.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { porfilePicture } from 'src/interfaces/porfilePicture';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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
  url = environment.url;

  datauserprofileimage: porfilePicture = {
    profile_image: null
  };
  name !: string;
  isModalOpen = false;
  isPrivacyPolicyOpen = false;
  isLoadingImage = true;


  constructor(
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router) { }




  async ionViewWillEnter() {

    //  await this.fetchProfileImage(this.name); // Call the method to fetch the profile image
    const storedName = localStorage.getItem('name');

    await this.fetchProfileImage(storedName);
    const sharedParam = localStorage.getItem('sharedParam');
    if (storedName) {
      this.name = storedName;
      // alert(this.name)
      //was here 
      localStorage.setItem('sharedParam', this.name);
    } else if (sharedParam) {
      this.name = sharedParam;
      // Store the shared parameter in local storage
    } else {
      await this.userDataService.GetData().subscribe((response: GetDataUser) => {
        this.name = response.data.name;
        localStorage.setItem('name', this.name); // Store the name in local storage
      });
    }

  }

  async ngOnInit() {
    //  check if user data stored in local storage  
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {

      const userData = JSON.parse(userDataString);
      const nameprofile = userData.name;
      localStorage.setItem('name', userData.name);
      this.name = userData.name;
      await this.fetchProfileImage(this.name); // Call the method to fetch the profile image
    }

    else {
      const name = this.getQueryParamValue('name');
      localStorage.setItem('name', name);
    }
  }

  getQueryParamValue(param: any): any {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['../login']);
  }
  setOpenHelp(isOpen: boolean) {
    this.isModalOpen = isOpen;

  }

  async fetchProfileImage(name: any) {
    // 
    try {
      const storedProfileImage = localStorage.getItem('profileImage');
      if (storedProfileImage) {

        this.datauserprofileimage.profile_image = storedProfileImage;
      } else {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const response = await this.http.get<any>(`${this.url}/api/users/profile-image`, { headers }).toPromise();
        if (response.profile_image === 'https://ui-avatars.com/api/?name=') {
          const modifiedProfileImage = response.profile_image + encodeURIComponent(name); // Add this.name to the profileImage URL
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


  setOpenPrivacy(isOpen: boolean) {
    this.isPrivacyPolicyOpen = isOpen;

  }



}
