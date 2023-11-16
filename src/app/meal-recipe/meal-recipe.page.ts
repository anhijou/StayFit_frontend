import { Component, OnInit } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Meal } from 'src/interfaces/meal.interface';

@Component({
  selector: 'app-meal-recipe',
  templateUrl: './meal-recipe.page.html',
  styleUrls: ['./meal-recipe.page.scss'],
})
export class MealRecipePage implements OnInit {
  meal!: Meal;
  ingrediants: any;
  img!: any;
  description!: any;
  time !: any;
  constructor(
    private mealsService: MealsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private location: Location

  ) { }

  ngOnInit() {
    let id = Number(this.activatedRoute.snapshot.params['id']);

    this.mealsService.GetmealsById(id).subscribe(response => {

      this.meal = response.data;
      this.ingrediants = response.data.ingrediants;
      this.img = response.data.img_url;
      this.description = response.data.description;
      this.time = response.data.time;
    })
  }


}
