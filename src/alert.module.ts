import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { IAlertConfig } from './alert.interfaces';
import { DEFAULT_CONFIG } from './alert.constants';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertComponent],
  entryComponents: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule {
  static forRoot(alertConfig?: IAlertConfig): ModuleWithProviders {
    let config = DEFAULT_CONFIG;
    if (alertConfig) {
      config = Object.assign(config, alertConfig);
    }
    return {
      ngModule: AlertModule,
      providers: [
        AlertService,
        {provide: 'alertConfig', useValue: config}
      ]
    };
  }
}
