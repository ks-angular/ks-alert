import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertModule } from '../../src/alert.module';

import { AppComponent } from './app.component';
import { ExtendAlertComponent } from './components/extend-alert/extend-alert.component';


@NgModule({
    declarations: [
        AppComponent,
        ExtendAlertComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AlertModule.forRoot()
    ],
    providers: [],
    entryComponents:[ExtendAlertComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
