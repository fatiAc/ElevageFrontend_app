import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlimentationPage } from './alimentation';

@NgModule({
  declarations: [
    AlimentationPage,
  ],
  imports: [
    IonicPageModule.forChild(AlimentationPage),
  ],
})
export class AlimentationPageModule {}
