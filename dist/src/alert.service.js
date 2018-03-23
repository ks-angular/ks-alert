"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var alert_interfaces_1 = require("./alert.interfaces");
var AlertService = /** @class */ (function () {
    function AlertService(componentFactoryResolver, appRef, alertConfig, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.alertConfig = alertConfig;
        this.injector = injector;
    }
    AlertService.prototype.create = function (req) {
        var _this = this;
        if (req.componentRef === undefined || req.componentRef === null) {
            req.componentRef = this.alertConfig.componentRef;
        }
        if (req.timeoutBeforeDestroy === undefined || req.timeoutBeforeDestroy === null) {
            req.timeoutBeforeDestroy = this.alertConfig.timeoutBeforeDestroy;
        }
        var componentRef = this._appendComponentToAppRoot(req.componentRef);
        componentRef.instance.config(req);
        componentRef.instance.eventResponse
            .subscribe(function (e) { return setTimeout(function () {
            return _this._destroyComponent(componentRef);
        }, req.timeoutBeforeDestroy); });
        return componentRef.instance.eventResponse;
    };
    AlertService.prototype._appendComponentToAppRoot = function (component) {
        var componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        var domElem = componentRef.hostView
            .rootNodes[0];
        this.alertConfig.rootElement.appendChild(domElem);
        return componentRef;
    };
    AlertService.prototype._destroyComponent = function (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    };
    AlertService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject('alertConfig')),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.ApplicationRef,
            alert_interfaces_1.IAlertConfig,
            core_1.Injector])
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map