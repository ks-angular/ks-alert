import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AlertModule} from '../../src/alert.module';

import { AppComponent } from './app.component';
import { ExtendAlertComponent } from './components/extend-alert/extend-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    ExtendAlertComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
