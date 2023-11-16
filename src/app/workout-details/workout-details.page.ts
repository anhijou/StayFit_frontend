import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
})
export class WorkoutDetailsPage implements OnInit {
  workout!: any;
  video!: any;
  description: any;
  title: any;
  time: any;
  type: any;


  constructor(
    private workoutService: WorkoutService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let id = Number(this.activatedRoute.snapshot.params['id']);

    this.workoutService.GetWorkoutById(id).subscribe(response => {

      this.workout = response.data;
      this.video = this.workout.video_url;
      this.description = this.workout.description;
      this.type = this.workout.only_gym;
      this.title = this.workout.name;
      this.time = this.workout.time;

    })
  }

  getSanitizedImageUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
  }

}
