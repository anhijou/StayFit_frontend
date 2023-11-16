import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),

  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then(m => m.FormPageModule),
    //canActivate: [AuthGuard] // Apply the guard to this route
  },
  {
    path: 'forgetpassword',
    loadChildren: () => import('./forgetpassword/forgetpassword.module').then(m => m.ForgetpasswordPageModule)
  },
  {
    path: 'auth/google/callback',
    loadChildren: () => import('./googlecallback/googlecallback.module').then(m => m.GooglecallbackPageModule)
  },
  {
    path: 'meals',
    loadChildren: () => import('./meals/meals.module').then(m => m.MealsPageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./progress/progress.module').then(m => m.ProgressPageModule),
  },
  {
    path: 'workouts/:id',
    loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofilePageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'mealcategory/:id',
    loadChildren: () => import('./meal-category/meal-category.module').then(m => m.MealCategoryPageModule)
  },
  {
    path: 'mealcategory/:id/mealrecipe/:id',
    loadChildren: () => import('./meal-recipe/meal-recipe.module').then(m => m.MealRecipePageModule)
  },
  {
    path: 'meals/mealrecipe/:id',
    loadChildren: () => import('./meal-recipe/meal-recipe.module').then(m => m.MealRecipePageModule)
  },
  {
    path: 'workoutcategory',
    loadChildren: () => import('./workout-category/workout-category.module').then( m => m.WorkoutCategoryPageModule)
  },
  {
    path: 'mealrecipe/:id',
    loadChildren: () => import('./meal-recipe/meal-recipe.module').then(m => m.MealRecipePageModule)
  },
  {
    path: 'workouts/:id/workoutdetails/:id',
    loadChildren: () => import('./workout-details/workout-details.module').then( m => m.WorkoutDetailsPageModule)
  },
  {
    path: 'favorites/workoutdetails/:id',
    loadChildren: () => import('./workout-details/workout-details.module').then( m => m.WorkoutDetailsPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'videocall',
    loadChildren: () => import('./video-call/video-call.module').then( m => m.VideoCallPageModule)
  },
  {
    path: 'videoroom',
    loadChildren: () => import('./video-room/video-room.module').then( m => m.VideoRoomPageModule)
  },








];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
