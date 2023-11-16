import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../services/workout.service';

register();


@Component({
  selector: 'app-workout-category',
  templateUrl: './workout-category.page.html',
  styleUrls: ['./workout-category.page.scss'],
})
export class WorkoutCategoryPage implements OnInit {
  @ViewChild('swiper')
  swiperRef:ElementRef | undefined;
  swiper?:Swiper;


  WorkoutCategory!:any[];
  searchTerm: any = '';
    searchWorkout!:any[];
  constructor(
    private workoutService :WorkoutService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.workoutService.GetWorkoutCategorys().subscribe((response:any)  =>{
      this.WorkoutCategory = this.searchWorkout =response.data;
    })
  }

  search(): void {
  
    this.WorkoutCategory = this.searchWorkout.filter((workout: any) => {
      return        JSON.stringify(workout.description).toLowerCase().includes(this.searchTerm.toLowerCase())  || JSON.stringify(workout.name).toLowerCase().includes(this.searchTerm.toLowerCase())  
    });
 
}

}
