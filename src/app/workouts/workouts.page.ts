import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {

  // workoutsgym!:any[];
  // workoutshome!:any[];
  workouts!:any[];
  favorite:boolean=false;
  searchTerm: any = '';
  searchWorkout!:any[];
  filteredWorkouts!:any;
  constructor(
    private workoutService:WorkoutService,
    private activatedRoute:ActivatedRoute,
    private favoritesService:FavoritesService,

    ) {}

  filterWorkouts(type: number) {
    // this.filteredWorkouts = this.workouts.filter(workout => workout.only_gym === type);
    this.filteredWorkouts= this.searchWorkout=this.workouts.filter(workout => workout.only_gym === type);
  }

  ngOnInit() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.workoutService.GetWorkoutCategoryById(id).subscribe((response:any)  =>{
      this.workouts = this.searchWorkout =response;
      this.filteredWorkouts= this.searchWorkout=this.workouts.filter(workout => workout.only_gym === 1);
      //alert(JSON.stringify(response));
    })

  }

  addToFavirate(id: number, favorite: boolean) {
    if (favorite) {
      this.favoritesService.deleteFavoritesApi(id).subscribe(
        () => {
          // Update the workout's favorite status
          const workout = this.workouts.find(workout =>{ return workout.id=== id})
          workout.favorite = false;
        }
      );
    } else {
      this.favoritesService.addFavoritesApi(id).subscribe(
        () => {
          // Update the workout's favorite status
          const workout = this.workouts.find(workout =>{ return workout.id=== id})

          workout.favorite = true;
        }
      );
    }
  }
  
  search(): void {
  
    this.filteredWorkouts = this.searchWorkout.filter((workout: any) => {
      return        JSON.stringify(workout.description).toLowerCase().includes(this.searchTerm.toLowerCase())  || JSON.stringify(workout.name).toLowerCase().includes(this.searchTerm.toLowerCase())  
    });
 
}

}
