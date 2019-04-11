import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MouvementTabsPage } from './mouvement-tabs';

@NgModule({
  declarations: [
    MouvementTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MouvementTabsPage),
  ],
})
export class MouvementTabsPageModule {}
