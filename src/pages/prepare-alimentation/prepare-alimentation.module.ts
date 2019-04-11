import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrepareAlimentationPage } from './prepare-alimentation';

@NgModule({
  declarations: [
    PrepareAlimentationPage,
  ],
  imports: [
    IonicPageModule.forChild(PrepareAlimentationPage),
  ],
})
export class PrepareAlimentationPageModule {}
