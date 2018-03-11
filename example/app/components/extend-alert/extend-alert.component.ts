import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { AlertComponent } from '../../../../src/alert.component';
import { AlertButtonType, IAlertResponse } from '../../../../src/alert.interfaces';

export class CustomAlertResponse extends IAlertResponse {
  alertText: string;
}

@Component({
  selector: 'ks-extend-alert',
  templateUrl: './extend-alert.component.html',
  styleUrls: ['./extend-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendAlertComponent extends AlertComponent {

  public inputText: string;

  constructor(protected injector: Injector) {
    super(injector);
  }

  submitClick() {
    const alertResponse: CustomAlertResponse = {
      request: this.request,
      alertText: this.inputText,
      responseButton: {isConfirm: false, type: AlertButtonType.NONE},
      confirm: true,
    };

    this.emitResponse(alertResponse);
  }

}
