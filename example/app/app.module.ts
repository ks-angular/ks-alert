import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AlertModule} from '../../src/alert.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
