import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesurePage } from './mesure';

@NgModule({
  declarations: [
    MesurePage,
  ],
  imports: [
    IonicPageModule.forChild(MesurePage),
  ],
})
export class MesurePageModule {}
