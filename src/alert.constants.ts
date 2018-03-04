import { IAlertButton, AlertButtonType, IAlertOptions } from './alert.interfaces';

export const ALERT_BUTTONS: IAlertButton[] = [
    {classes: 'd-none', type: AlertButtonType.NONE},
    {classes: 'btn btn-primary', title: 'Yes', type: AlertButtonType.YES},
    {classes: 'btn btn-primary', title: 'Ok', type: AlertButtonType.OK},
    {classes: 'btn btn-primary', title: 'Retry', type: AlertButtonType.RETRY},
    {classes: 'btn btn-primary', title: 'No', type: AlertButtonType.NO},
    {classes: 'btn btn-primary', title: 'Abort', type: AlertButtonType.ABORT},
    {classes: 'btn btn-secondary', title: 'Cancel', type: AlertButtonType.CANCEL},
    {classes: 'btn btn-secondary', title: 'Ignore', type: AlertButtonType.IGNORE},
];

export const DEFAULT_OPTIONS: IAlertOptions = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    duration: null
};
