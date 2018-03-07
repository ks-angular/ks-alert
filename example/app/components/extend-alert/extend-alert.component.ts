import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
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

  constructor(protected _elementRef: ElementRef,
              protected _changeDetectorRef: ChangeDetectorRef) {
    super(_elementRef, _changeDetectorRef);
  }

  submitClick() {
    const alertResponse: CustomAlertResponse = {
      request: this.request,
      alertText: this.inputText,
      responseButton: {type: AlertButtonType.NONE},
      confirm: true
    };

    this.emitResponse(alertResponse);
  }

}
