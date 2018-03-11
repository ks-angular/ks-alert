import { Component, TemplateRef } from '@angular/core';
import { AlertService } from '../../src/alert.service';
import { IconType, IAlertRequest, AlertButtonType } from '../../src/alert.interfaces';
import { ExtendAlertComponent } from './components/extend-alert/extend-alert.component';

@Component({
  selector: 'ks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  IconType = IconType;
  AlertButtonType = AlertButtonType;

  public cntrAlert: IAlertRequest = {
    caption: 'Alert caption',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn s',
    options: {
      overlayClickToCancel: true,
      showCloseButton: true,
      overlay: true,
      duration: 10000
    },
    alertButtons: [AlertButtonType.YES, AlertButtonType.NO, AlertButtonType.CANCEL]
  };

  public tmpltAlert: IAlertRequest = {
    iconType: IconType.SUCCESS,
    caption: 'Alert caption',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn s',
    alertButtons: [AlertButtonType.YES, AlertButtonType.NO, AlertButtonType.CANCEL]
  };

  public alertTypes = [
    {label: 'IconType.NONE', value: IconType.NONE},
    {label: 'IconType.SUCCESS', value: IconType.SUCCESS},
    {label: 'IconType.WARNING', value: IconType.WARNING},
    {label: 'IconType.DANGER', value: IconType.DANGER},
    {label: 'IconType.INFO', value: IconType.INFO},
  ];
  public selectedAlertType = this.alertTypes[1];

  public alertButtonsTypes = [
    {selected: true, value: AlertButtonType.YES, label: 'YES'},
    {selected: false, value: AlertButtonType.OK, label: 'OK'},
    {selected: false, value: AlertButtonType.RETRY, label: 'RETRY'},
    {selected: true, value: AlertButtonType.NO, label: 'NO'},
    {selected: false, value: AlertButtonType.ABORT, label: 'ABORT'},
    {selected: true, value: AlertButtonType.CANCEL, label: 'CANCEL'},
    {selected: false, value: AlertButtonType.IGNORE, label: 'IGNORE'},
    {selected: false, value: AlertButtonType.CONFIRM, label: 'CONFIRM'},
    {selected: false, value: AlertButtonType.ALLOW, label: 'ALLOW'},
    {selected: false, value: AlertButtonType.DENY, label: 'DENY'},
  ];

  constructor(private alertService: AlertService) {
  }


  createAlertAssign(base: IAlertRequest, modify: IAlertRequest) {
    this.createAlert(Object.assign(base, modify));
  }

  createAlert(req: IAlertRequest) {
    this.alertService.create(req).subscribe();
  }

  createAlertCustom() {
    this.alertService.create({componentRef: ExtendAlertComponent}).subscribe();
  }

  createRefAlert(req: IAlertRequest, templateRef: TemplateRef<any>) {
    req.templateRef = templateRef;
    this.alertService.create(req).subscribe();
  }

  cntrSelectAlertType(selected) {
    this.cntrAlert.iconType = selected.value;
  }

  cntrSelectAlertButtonType() {
    this.cntrAlert.alertButtons = [];
    this.alertButtonsTypes.forEach(i => i.selected ? this.cntrAlert.alertButtons.push(i.value) : true);
  }
}
