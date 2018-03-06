import { AlertComponent } from './alert.component';
import { TemplateRef } from '@angular/core';

export enum AlertType {
    NONE = 0,
    SUCCESS = 1,
    WARNING,
    DANGER,
    INFO,
}

export enum AlertButtonType {
    NONE = 0,
    YES = 1,
    OK,
    RETRY,
    NO,
    ABORT,
    CANCEL,
    IGNORE,
    CONFIRM,
    ALLOW,
    DENY
}

export interface IAlertOptions {
    overlay?: boolean;
    overlayClickToCancel?: boolean;
    showCloseButton?: boolean;
    duration?: number; // after time out alert will closed with CANCEL trigger
}

export class IAlertButton {
    title?: string;
    classes?: string; // css class
    type: AlertButtonType; // approximately type
}

export interface IAlertRequest {
    caption?: string;
    text?: string;
    alertType?: AlertType;
    alertButtons?: (AlertButtonType | IAlertButton) [];
    options?: IAlertOptions;
    componentRef?: typeof AlertComponent;
    templateRef?: TemplateRef<any>;
}

export class IAlertResponse {
    request: IAlertRequest;
    responseButton: IAlertButton;
    confirm: boolean; // Equal to: CONFIRM, YES, OK, RETRY, ALLOW
}
