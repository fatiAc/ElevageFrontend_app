import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SignInPage} from "../pages/sign-in/sign-in";
import {UserProvider} from '../providers/userProvider';
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {DetailAlimentationPage} from "../pages/detail-alimentation/detail-alimentation";
import {AlimentationPage} from "../pages/alimentation/alimentation";
import {RecupAlimentationPage} from "../pages/recup-alimentation/recup-alimentation";
import {DetailAlimentationProvider} from '../providers/detail-alimentation';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {PeriodeAlimentationProvider} from '../providers/periode-alimentation';
import {NourritureProvider} from '../providers/nourritureProvider';
import { RecupAlimentationProvider } from '../providers/recup-alimentation';
import {PrepareAlimentationPage} from "../pages/prepare-alimentation/prepare-alimentation";
import { PrepareAlimentationProvider } from '../providers/prepare-alimentation';
import {PopoverComponent} from "../components/popover/popover";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    DetailAlimentationPage,
    AlimentationPage,
    RecupAlimentationPage,
    PrepareAlimentationPage,
    PopoverComponent
  ],
  imports: [
    //added by me
    HttpModule,
    HttpClientModule,
    NgxDatatableModule,
    ///////
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    DetailAlimentationPage,
    AlimentationPage,
    RecupAlimentationPage,
    PrepareAlimentationPage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    DetailAlimentationProvider,
    PeriodeAlimentationProvider,
    NourritureProvider,
    RecupAlimentationProvider,
    PrepareAlimentationProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
