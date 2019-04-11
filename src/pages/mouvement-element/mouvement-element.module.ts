import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MouvementElementPage } from './mouvement-element';

@NgModule({
  declarations: [
    MouvementElementPage,
  ],
  imports: [
    IonicPageModule.forChild(MouvementElementPage),
  ],
})
export class MouvementElementPageModule {}
