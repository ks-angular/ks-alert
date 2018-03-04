import {AlertComponent} from './alert.component';

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
    CONFIRM
}

export interface IAlertOptions {
    overlay?: boolean;
    overlayClickToClose?: boolean;
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
}

export class IAlertResponse {
    request: IAlertRequest;
    responseButton: IAlertButton;
    confirm: boolean; // Equal to: CONFIRM, YES, OK, RETRY
}
