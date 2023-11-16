import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { UserDataService } from '../services/user-data.service';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { ProfileImageService } from '../services/profile-image.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { porfilePicture } from 'src/interfaces/porfilePicture';
import { NavController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  name!: string;
  url = environment.url;
  // Interface representing user data
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
  // Interface representing user profile image data
  datauserprofileimage: porfilePicture = {
    profile_image: null
  };
  isLoadingImage = true;
  constructor(
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private profileImageService: ProfileImageService,
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService) { }

  // Runs when the page is about to enter and become the active page
  async ionViewWillEnter() {

    this.fetchProfileImage(); // Call the method to fetch the profile image
    const storedName = localStorage.getItem('name');
    const sharedParam = localStorage.getItem('sharedParam');

    if (storedName) {
      this.name = storedName;
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
  // Runs when the component is initialized
  async ngOnInit() {

    await this.fetchProfileImage(); // Call the method to fetch the profile image

    const storedName = localStorage.getItem('name');
    const sharedParam = localStorage.getItem('sharedParam');

    if (storedName) {
      this.name = storedName;
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

  // method that fetch profile image from database
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
          localStorage.getItem('sharedParam');
          const modifiedProfileImage = response.profile_image + encodeURIComponent(this.name); // Add this.name to the profileImage URL for Generating avatar
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







}
