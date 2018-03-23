"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var alert_component_1 = require("./alert.component");
var alert_service_1 = require("./alert.service");
var alert_constants_1 = require("./alert.constants");
var AlertModule = /** @class */ (function () {
    function AlertModule() {
    }
    AlertModule_1 = AlertModule;
    AlertModule.forRoot = function (alertConfig) {
        return {
            ngModule: AlertModule_1,
            providers: [
                alert_service_1.AlertService,
                { provide: 'alertConfig', useValue: Object.assign(alert_constants_1.DEFAULT_CONFIG, alertConfig) }
            ]
        };
    };
    AlertModule = AlertModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [alert_component_1.AlertComponent],
            entryComponents: [alert_component_1.AlertComponent],
            exports: [alert_component_1.AlertComponent]
        })
    ], AlertModule);
    return AlertModule;
    var AlertModule_1;
}());
exports.AlertModule = AlertModule;
//# sourceMappingURL=alert.module.js.map