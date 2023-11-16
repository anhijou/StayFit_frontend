import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VideoCallTokenService } from '../services/video-call-token.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-video-room',
  templateUrl: './video-room.page.html',
  styleUrls: ['./video-room.page.scss'],
})
export class VideoRoomPage implements OnInit {

  @ViewChild('buttonToActivate') buttonToActivate!: ElementRef;

  email: any = '';
  channel: string = '';
  emailFormControl!: FormControl;
  showerrurjoin: boolean = false;
  showerrurcreate: boolean = false;
  isModalOpenError: boolean = false;
  isModalOpenToken: boolean = false;
  Alertmessage!: string;
  linkbool:boolean=false;
  datapost !: any;
  lien !: any;
  token !: any;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private videocallTokenservice: VideoCallTokenService,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing
  ) { 
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
  }

  ngOnInit() {
    
  }



  copyToClipboard() {
   this.clipboard.copy(this.lien);
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  async canDismiss1(data?: any, role?: string) {
    return role !== 'gesture';
  }
share(){
  this.socialSharing.share(this.lien)
  .then(() => {
    console.log('Shared successfully');
  }).catch((error) => {
    console.error('Error while sharing', error);
  });
}
  

  createRoom() {

    if (this.emailFormControl.valid) {
      //

      this.videocallTokenservice.CreateRoom(this.email).subscribe((response: any) => {

        this.lien = response.data.channel;
        this.token = response.data.token;

        // Use the extracted channel and token as needed
        console.log('Channel get:', this.lien);
        console.log('Token:', this.token);

        this.modalController.dismiss()
        this.setOpenToken(true);
        //this.router.navigate(['/videocall'], { queryParams: { lien: this.lien, token: this.token } });


      },
        (error: any) => {
          let errorMessage = "The receiver email field must be a valid email address.";
          if (error?.error?.receiver_email && Array.isArray(error.error.receiver_email)) {
            errorMessage = error.error.receiver_email[0];
          }
          //  alert(errorMessage);
          this.setOpenError(true);
          this.Alertmessage = errorMessage;
        }
      );
    } else {

      this.showerrurcreate = true;
    }

  }
  setOpenError(isOpen: boolean) {
    this.isModalOpenError = isOpen;
  }
  setOpenToken(isOpen: boolean) {
    this.linkbool = isOpen;
  }

  goTomeet(){
    this.setOpenToken(false);
    this.router.navigate(['/videocall'], { queryParams: { lien: this.lien, token: this.token } });
  }
  // joinRoom() {
  //   if (this.channel.length >= 10) {
  //     //
  //     try {
  //       this.videocallTokenservice.GetData().subscribe((response: any) => {

  //         this.lien = response.channel;
  //         this.token = response.token;

  //         // Use the extracted channel and token as needed
  //         console.log('Channel get:', this.lien);
  //         console.log('Token:', this.token);

  //         this.modalController.dismiss();
  //         this.router.navigate(['/videocall'], { queryParams: { lien: this.lien, token: this.token } });
  //       });
  //     }
  //     catch (error: any) {
  //       alert(error.error)
  //     }





  //   } else {

  //     this.showerrurjoin = true;

  //   }
  // }

  joinRoom() {
    if (this.channel.length >= 10) {

      this.videocallTokenservice.GetData().subscribe(
        (response: any) => {
          this.lien = response.channel;
          this.token = response.token;

          // Use the extracted channel and token as needed
          console.log('Channel get:', this.lien);
          console.log('Token:', this.token);

          this.modalController.dismiss();
          this.router.navigate(['/videocall'], {
            queryParams: { lien: this.lien, token: this.token },
          });
        },
        (error: any) => {
          //  alert(error.error.error);
          this.setOpenError(true);
          this.Alertmessage = error.error.error;
        }
      );

    } else {
      this.showerrurjoin = true;
    }
  }
}
