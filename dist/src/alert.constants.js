"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_interfaces_1 = require("./alert.interfaces");
var alert_component_1 = require("./alert.component");
exports.ALERT_BUTTONS = [
    { isConfirm: false, classes: 'd-none', type: alert_interfaces_1.AlertButtonType.NONE },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Yes', type: alert_interfaces_1.AlertButtonType.YES },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Ok', type: alert_interfaces_1.AlertButtonType.OK },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Retry', type: alert_interfaces_1.AlertButtonType.RETRY },
    { isConfirm: false, classes: 'btn btn-primary', title: 'No', type: alert_interfaces_1.AlertButtonType.NO },
    { isConfirm: false, classes: 'btn btn-primary', title: 'Abort', type: alert_interfaces_1.AlertButtonType.ABORT },
    { isConfirm: false, classes: 'btn btn-secondary', title: 'Cancel', type: alert_interfaces_1.AlertButtonType.CANCEL },
    { isConfirm: false, classes: 'btn btn-secondary', title: 'Ignore', type: alert_interfaces_1.AlertButtonType.IGNORE },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Confirm', type: alert_interfaces_1.AlertButtonType.CONFIRM },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Allow', type: alert_interfaces_1.AlertButtonType.ALLOW },
    { isConfirm: false, classes: 'btn btn-primary', title: 'Deny', type: alert_interfaces_1.AlertButtonType.DENY },
];
exports.DEFAULT_OPTIONS = {
    overlay: true,
    overlayClickToCancel: true,
    showCloseButton: true,
    duration: null
};
exports.DEFAULT_CONFIG = {
    componentRef: alert_component_1.AlertComponent,
    options: exports.DEFAULT_OPTIONS,
    alertButtonsResource: exports.ALERT_BUTTONS,
    rootElement: document.body,
    timeoutBeforeDestroy: 600
};
//# sourceMappingURL=alert.constants.js.map