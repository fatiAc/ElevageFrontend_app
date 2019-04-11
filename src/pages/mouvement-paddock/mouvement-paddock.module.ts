import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MouvementPaddockPage } from './mouvement-paddock';

@NgModule({
  declarations: [
    MouvementPaddockPage,
  ],
  imports: [
    IonicPageModule.forChild(MouvementPaddockPage),
  ],
})
export class MouvementPaddockPageModule {}
