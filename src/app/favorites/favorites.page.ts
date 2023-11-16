import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
favoriteList!:any;
searchTerm: any = '';
  searchFavorite:any;
  refreshInterval!: Subscription;

  constructor(
    private favoritesService:FavoritesService,
  ) { }

  ngOnInit() {
    this.getFavorites();
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    this.stopAutoRefresh();
  }

  getFavorites(): void {
    this.favoritesService.GetFavorites().subscribe(response => {
      this.favoriteList = this.searchFavorite = response.data;
    });
  }

  deleteFavorite(id: number): void {
    this.favoritesService.deleteFavoritesApi(id).subscribe(() => {
      this.favoriteList = this.favoriteList.filter((favorite:any) => favorite.id !== id);
    });
  }

  search(): void {
    this.favoriteList = this.searchFavorite.filter((favorite:any) => {
      return JSON.stringify(favorite.description).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             JSON.stringify(favorite.name).toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  startAutoRefresh(): void {
    // Refresh every 5 seconds (adjust the interval duration as needed)
    this.refreshInterval = interval(5000)
      .pipe(
        switchMap(() => this.favoritesService.GetFavorites())
      )
      .subscribe(response => {
        this.favoriteList = this.searchFavorite = response.data;
      });
  }

  stopAutoRefresh(): void {
    this.refreshInterval.unsubscribe();
  }
}
