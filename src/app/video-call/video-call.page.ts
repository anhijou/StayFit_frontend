import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoCallTokenService } from '../services/video-call-token.service';
import { WorkoutService } from '../services/workout.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.page.html',
  styleUrls: ['./video-call.page.scss'],
})
export class VideoCallPage implements OnInit {
  APP_ID: string = "628c67dac05042a1bf71cba6af3658a4";
  TOKEN: string = "007eJxTYOjPnb5zEdOl0jmTgk\/2fTJ\/4X0m7UzSoz+LAi+yhEYd88tUYDAzskg2M09JTDYwNTAxSjRMSjM3TE5KNEtMMzYztUg06Zi1IkVBhoFh7kNjRkYGCATxuRjCLIICQ7Pdvf0rGRkMAN9xIqM=";
  CHANNEL: string = "V8RQUkGKOy";
  lien!: string;
  token!: string;
  isModalOpen = false;
  client: any;
  videourl!: SafeResourceUrl;
  localTracks: any[] = [];
  remoteUsers: any = {};
  Getallworkout: any[] = [];
  currentWorkoutid:any=null;
  private timer: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private workoutservice: WorkoutService,
    private sanitizer: DomSanitizer,
    private videocallTokenservice: VideoCallTokenService) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    //this.GetWorkout();
  }
  async ngOnInit() {

    this.GetWorkout();
    this.route.queryParams.subscribe(params => {
      this.lien = params['lien'];
      this.token = params['token'];

    });

// // the code sets up a timer to fetch data from the backend at regular intervals and checks if the workout ID has changed. If a change is detected, it retrieves the corresponding workout and updates the video URL for display.
    this.timer = setInterval(() => {
      this.videocallTokenservice.GetData().subscribe((data: any) => {
        // Check if data has changed
        if (data.workout_id!= this.currentWorkoutid) {
          // Data has changed, take action
          //this.currentWorkoutid = data.workout_id;
          const foundWorkout = this.Getallworkout.find(workout => workout.id === data.workout_id);
          const videolink= this.sanitizer.bypassSecurityTrustResourceUrl(foundWorkout.video_url);
          if(this.videourl!=videolink){
          this.videourl= this.sanitizer.bypassSecurityTrustResourceUrl(foundWorkout.video_url);
        }

          // Perform necessary operations with updated data
        }
      });
    }, 1000);
    this.client.on('user-published', this.handleUserJoined.bind(this));
    this.client.on('user-left', this.handleUserLeft.bind(this));


    await this.joinStream();
    // await this.client.join(this.APP_ID, this.CHANNEL, this.TOKEN, null);
    //  this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
  }

  async joinAndDisplayLocalStream() {

    let UID = await this.client.join(this.APP_ID, this.lien, this.token, null);

    let player = document.createElement('div');
    player.className = 'video-container';
    player.id = `user-container-${UID}`;
    player.innerHTML = `
      <div class="video-player" id="user-${UID}"></div>
    `;

    document.getElementById('video-streams')!.appendChild(player);


    this.localTracks[1].play(`user-${UID}`);

    await this.client.publish(this.localTracks);

  }
  GetWorkout() {

    this.workoutservice.GetallWorkout().subscribe(async (response: any) => {

      // Assuming the response is an array of progress entries
      const allworkout = response.data;
      this.Getallworkout = allworkout;
      console.log(this.Getallworkout)
    });
  }

  choseWorkout(workoutid: number, videourl: string) {
    this.currentWorkoutid=workoutid;
     this.videourl= this.sanitizer.bypassSecurityTrustResourceUrl(videourl);
    this.videocallTokenservice.changeOrChoseWorkout(workoutid).subscribe((response: any) => {
      console.log(response)
    });
    this.isModalOpen = false;
  }



  async joinStream() {
    this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    await this.joinAndDisplayLocalStream();

    document.getElementById('join-btn')!.style.display = 'none';
    document.getElementById('stream-controls')!.style.display = 'flex';
  }

  async handleUserJoined(user: any, mediaType: string) {
    this.remoteUsers[user.uid] = user;
    await this.client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      let player: HTMLElement | null = document.getElementById(`user-container-${user.uid}`);
      if (player != null) {
        player.remove();
      }

      player = document.createElement('div');
      player.className = 'video-container';
      player.id = `user-container-${user.uid}`;
      player.innerHTML = `
        <div class="video-player" id="user-${user.uid}"></div>
      `;
      document.getElementById('video-streams')?.appendChild(player);

      user.videoTrack.play(`user-${user.uid}`);
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  }

  async handleUserLeft(user: any) {
    delete this.remoteUsers[user.uid];
    document.getElementById(`user-container-${user.uid}`)?.remove();
  }

  async leaveAndRemoveLocalStream() {
    for (let i = 0; i < this.localTracks.length; i++) {
      this.localTracks[i].stop();
      this.localTracks[i].close();
    }

    await this.client.leave();
    document.getElementById('join-btn')!.style.display = 'block';
    document.getElementById('stream-controls')!.style.display = 'none';
    document.getElementById('video-streams')!.innerHTML = '';
    this.currentWorkoutid =null;
    this.videocallTokenservice.deleteroomFromDatabase().subscribe((response: any) => {
      //alert(response.message);

      this.router.navigate(['/dashboard']);
    });

    this.router.navigate(['/dashboard']);
  }

  async toggleMic(e: any) {
    if (this.localTracks[0].muted) {
      await this.localTracks[0].setMuted(false);
      e.target.innerText = 'Mic on';
      e.target.style.backgroundColor = 'cadetblue';
    } else {
      await this.localTracks[0].setMuted(true);
      e.target.innerText = 'Mic off';
      e.target.style.backgroundColor = '#EE4B2B';
    }
  }

  async toggleCamera(e: any) {
    if (this.localTracks[1].muted) {
      await this.localTracks[1].setMuted(false);
      e.target.innerText = 'Camera on';
      e.target.style.backgroundColor = 'cadetblue';
    } else {
      await this.localTracks[1].setMuted(true);
      e.target.innerText = 'Camera off';
      e.target.style.backgroundColor = '#EE4B2B';
    }
  }



  ngOnDestroy() {
    // Clean up resources, unsubscribe from observables, etc.
    this.leaveAndRemoveLocalStream();
  }
}

