import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailAlimentationPage } from './detail-alimentation';

@NgModule({
  declarations: [
    DetailAlimentationPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailAlimentationPage),
  ],
})
export class DetailAlimentationPageModule {}
