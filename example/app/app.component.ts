import { Component } from '@angular/core';
import { AlertService } from '../../src/alert.service';
import { AlertType, IAlertRequest, AlertButtonType } from '../../src/alert.interfaces';

@Component({
  selector: 'ks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  AlertType = AlertType;
  AlertButtonType = AlertButtonType;

  public defaultAlert: IAlertRequest = {
    caption: 'Alert caption',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn s',
  };

  constructor(private alertService: AlertService) {}


  createAlertAssign(base: IAlertRequest, modify: IAlertRequest) {
    this.createAlert(Object.assign(base, modify));
  }

  createAlert(req: IAlertRequest) {
    this.alertService.create(req).subscribe();
  }
}
