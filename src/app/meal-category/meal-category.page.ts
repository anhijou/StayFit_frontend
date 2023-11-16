import { Component, OnInit } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Meal } from "src/interfaces/meal.interface";

@Component({
  selector: 'app-meal-category',
  templateUrl: './meal-category.page.html',
  styleUrls: ['./meal-category.page.scss'],
})
export class MealCategoryPage implements OnInit {

  mealsCategory!: Meal[];
  searchTerm: any = '';
  searchmeals!: Meal[];
  id!: number;
  namecategorie !: any;
  imagecategorie!: any;

  constructor(
    private mealsService: MealsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }





  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    this.mealsService.GetcategoryById(this.id).subscribe(response => {
      //this.mealsCategory=response;
      this.namecategorie = response.data.name;
      this.imagecategorie = response.data.img_url;
    });
    this.mealsService.GetmealsByCategoryId(this.id).subscribe(response => {
      //this.mealsCategory=response;
      this.mealsCategory = this.searchmeals = response;
      //  alert(JSON.stringify(this.mealsCategory))
    });


  }

  search(): void {

    this.mealsCategory = this.searchmeals.filter((meal: Meal) => {
      return JSON.stringify(meal.description).toLowerCase().includes(this.searchTerm.toLowerCase()) || JSON.stringify(meal.name).toLowerCase().includes(this.searchTerm.toLowerCase())
    });

  }



}
