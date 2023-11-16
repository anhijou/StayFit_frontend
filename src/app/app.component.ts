import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isNavigating = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNavigating = true;
        setTimeout(() => {
          this.isNavigating = false;
        }, 1000); // Adjust the timing to match your transition duration
      }
    });
  }
}
