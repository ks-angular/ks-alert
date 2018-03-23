"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IconType;
(function (IconType) {
    IconType[IconType["NONE"] = 0] = "NONE";
    IconType[IconType["SUCCESS"] = 1] = "SUCCESS";
    IconType[IconType["WARNING"] = 2] = "WARNING";
    IconType[IconType["DANGER"] = 3] = "DANGER";
    IconType[IconType["INFO"] = 4] = "INFO";
})(IconType = exports.IconType || (exports.IconType = {}));
var AlertButtonType;
(function (AlertButtonType) {
    AlertButtonType[AlertButtonType["NONE"] = 0] = "NONE";
    AlertButtonType[AlertButtonType["YES"] = 1] = "YES";
    AlertButtonType[AlertButtonType["OK"] = 2] = "OK";
    AlertButtonType[AlertButtonType["RETRY"] = 3] = "RETRY";
    AlertButtonType[AlertButtonType["NO"] = 4] = "NO";
    AlertButtonType[AlertButtonType["ABORT"] = 5] = "ABORT";
    AlertButtonType[AlertButtonType["CANCEL"] = 6] = "CANCEL";
    AlertButtonType[AlertButtonType["IGNORE"] = 7] = "IGNORE";
    AlertButtonType[AlertButtonType["CONFIRM"] = 8] = "CONFIRM";
    AlertButtonType[AlertButtonType["ALLOW"] = 9] = "ALLOW";
    AlertButtonType[AlertButtonType["DENY"] = 10] = "DENY";
})(AlertButtonType = exports.AlertButtonType || (exports.AlertButtonType = {}));
var IAlertButton = /** @class */ (function () {
    function IAlertButton() {
    }
    return IAlertButton;
}());
exports.IAlertButton = IAlertButton;
var IAlertIcon = /** @class */ (function () {
    function IAlertIcon() {
    }
    return IAlertIcon;
}());
exports.IAlertIcon = IAlertIcon;
var IAlertResponse = /** @class */ (function () {
    function IAlertResponse() {
    }
    return IAlertResponse;
}());
exports.IAlertResponse = IAlertResponse;
var IAlertConfig = /** @class */ (function () {
    function IAlertConfig() {
    }
    return IAlertConfig;
}());
exports.IAlertConfig = IAlertConfig;
//# sourceMappingURL=alert.interfaces.js.map