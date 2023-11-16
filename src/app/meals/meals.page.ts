import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { NavController } from '@ionic/angular';
import Swiper from 'swiper';
import { MealsService } from '../services/meals.service';

register();

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  @ViewChild('swiper')
  swiperRef:ElementRef | undefined;
  swiper?:Swiper;
  lastMeals:any;

  constructor(
    private navCtrl: NavController,
    private mealsService :MealsService,
    ) { }

  ngOnInit() {
    this.mealsService.Getmeals().subscribe(response => {
      // Assuming the response is an array of meals
      const mealsList = response;
    
      // // Get the last 5 meals from the array and reverse the order
      // const lastFiveMeals = mealsList.slice(-10).reverse();
    
      // // Store the last 5 reversed meals in a variable
      // this.lastMeals = lastFiveMeals;

      this.lastMeals =response;
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
}