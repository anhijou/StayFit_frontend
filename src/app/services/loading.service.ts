import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private loadingController: LoadingController) { }

  async presentLoading(waitingnumber?: number) {
    const loading = await this.loadingController.create({
      // message: 'This Loader Will Auto Hide in 1 Seconds',
      duration: waitingnumber,
      cssClass: 'custom-loader-class'
    });

    await loading.present();

    loading.onDidDismiss().then(() => {
      console.log('Loading dismissed! after 2 Seconds');
    });
  }

  async presentLoadingDynamic(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      cssClass: 'custom-loader-class'
    });

    await loading.present();

    return loading;
  }


}
