import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { porfilePicture } from 'src/interfaces/porfilePicture';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {


  // local url 'http://127.0.0.1:8100/api/users/profile-image'
  constructor(private http: HttpClient) { }

  datauser !: GetDataUser;
  name: any = localStorage.getItem('sharedParam');
  datauserprofileimage: porfilePicture = {
    profile_image: null
  };
  async fetchProfileImage(name: any) {
    try {
      const storedProfileImage = localStorage.getItem('profileImage');
      if (storedProfileImage) {

        this.datauserprofileimage.profile_image = storedProfileImage;
      } else {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const response = await this.http.get<any>('https://stayfit.ma/api/users/profile-image', { headers }).toPromise();
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


  async fetchProfileImage1() {
    try {
      const storedProfileImage = localStorage.getItem('profileImage');
      if (storedProfileImage) {
        this.datauserprofileimage.profile_image = storedProfileImage;
      } else {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        const response = await this.http.get<any>('https://stayfit.ma/api/users/profile-image', { headers }).toPromise();
        this.datauserprofileimage.profile_image = response.profile_image;
        localStorage.setItem('profileImage', response.profile_image); // Store the profile image URL in local storage
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  }


}
