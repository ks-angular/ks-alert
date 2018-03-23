import { TemplateRef } from '@angular/core';
import { AlertComponent } from './alert.component';
export declare enum IconType {
    NONE = 0,
    SUCCESS = 1,
    WARNING = 2,
    DANGER = 3,
    INFO = 4,
}
export declare enum AlertButtonType {
    NONE = 0,
    YES = 1,
    OK = 2,
    RETRY = 3,
    NO = 4,
    ABORT = 5,
    CANCEL = 6,
    IGNORE = 7,
    CONFIRM = 8,
    ALLOW = 9,
    DENY = 10,
}
export declare class IAlertButton {
    title?: string;
    classes?: string;
    isConfirm: boolean;
    type?: AlertButtonType;
}
export declare class IAlertIcon {
    src?: string;
    classes?: string;
}
export interface IAlertOptions {
    overlay?: boolean;
    overlayClickToCancel?: boolean;
    showCloseButton?: boolean;
    duration?: number;
}
export interface IAlertRequest {
    caption?: string;
    text?: string;
    iconType?: IconType | IAlertIcon;
    alertButtons?: (AlertButtonType | IAlertButton)[];
    options?: IAlertOptions;
    componentRef?: typeof AlertComponent;
    templateRef?: TemplateRef<any>;
    timeoutBeforeDestroy?: number;
}
export declare class IAlertResponse {
    request: IAlertRequest;
    responseButton: IAlertButton;
    confirm: boolean;
}
export declare class IAlertConfig {
    options?: IAlertOptions;
    componentRef?: typeof AlertComponent;
    alertButtonsResource?: IAlertButton[];
    rootElement?: any;
    timeoutBeforeDestroy?: number;
}
