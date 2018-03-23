import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Injector, ApplicationRef, ComponentFactoryResolver, Inject, Injectable, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

var IconType = {
    NONE: 0,
    SUCCESS: 1,
    WARNING: 2,
    DANGER: 3,
    INFO: 4,
};
IconType[IconType.NONE] = "NONE";
IconType[IconType.SUCCESS] = "SUCCESS";
IconType[IconType.WARNING] = "WARNING";
IconType[IconType.DANGER] = "DANGER";
IconType[IconType.INFO] = "INFO";
var AlertButtonType = {
    NONE: 0,
    YES: 1,
    OK: 2,
    RETRY: 3,
    NO: 4,
    ABORT: 5,
    CANCEL: 6,
    IGNORE: 7,
    CONFIRM: 8,
    ALLOW: 9,
    DENY: 10,
};
AlertButtonType[AlertButtonType.NONE] = "NONE";
AlertButtonType[AlertButtonType.YES] = "YES";
AlertButtonType[AlertButtonType.OK] = "OK";
AlertButtonType[AlertButtonType.RETRY] = "RETRY";
AlertButtonType[AlertButtonType.NO] = "NO";
AlertButtonType[AlertButtonType.ABORT] = "ABORT";
AlertButtonType[AlertButtonType.CANCEL] = "CANCEL";
AlertButtonType[AlertButtonType.IGNORE] = "IGNORE";
AlertButtonType[AlertButtonType.CONFIRM] = "CONFIRM";
AlertButtonType[AlertButtonType.ALLOW] = "ALLOW";
AlertButtonType[AlertButtonType.DENY] = "DENY";
var IAlertButton = /** @class */ (function () {
    function IAlertButton() {
    }
    return IAlertButton;
}());
var IAlertIcon = /** @class */ (function () {
    function IAlertIcon() {
    }
    return IAlertIcon;
}());
var IAlertResponse = /** @class */ (function () {
    function IAlertResponse() {
    }
    return IAlertResponse;
}());
var IAlertConfig = /** @class */ (function () {
    function IAlertConfig() {
    }
    return IAlertConfig;
}());
var AlertComponent = /** @class */ (function () {
    function AlertComponent(injector) {
        this.injector = injector;
        this.IconType = IconType;
        this.cancelButton = { isConfirm: false, type: AlertButtonType.CANCEL };
        this.appear = false;
        this.disappear = false;
        this.elementRef = injector.get(ElementRef);
        this.changeDetectorRef = injector.get(ChangeDetectorRef);
        this.alertConfig = injector.get('alertConfig', {});
        this.disabled = true;
        this.request = {};
        this.options = Object.assign({}, this.alertConfig.options);
        this._subscriptions = [];
        this._resSubject = new Subject();
        this.eventResponse = this._resSubject.asObservable();
    }
    AlertComponent.prototype.config = function (request) {
        var _this = this;
        clearTimeout(this._closeTimeOut);
        if (request) {
            this.request = request;
            if (request.options) {
                this.options = Object.assign({}, this.alertConfig.options, request.options);
                if (request.options.duration) {
                    this._closeTimeOut = setTimeout(function () {
                        _this.buttonClick(_this.cancelButton);
                    }, request.options.duration);
                }
            }
            else {
                this.options = Object.assign({}, this.alertConfig.options);
            }
            this.buttons = [];
            if (this.request.alertButtons) {
                this.request.alertButtons.forEach(function (i) {
                    if (AlertButtonType.hasOwnProperty(i.toString())) {
                        _this.buttons.push(_this.alertConfig.alertButtonsResource[+i]);
                    }
                    else if (i instanceof IAlertButton) {
                        _this.buttons.push((i));
                    }
                    else {
                        throw {
                            message: 'Alert Button isn\'t recognize. Make sure that alert button is instance of IconType or IAlertButton.',
                            object: i
                        };
                    }
                });
            }
            this.appear = true;
            this.disabled = false;
            this.changeDetectorRef.markForCheck();
            this.changeDetectorRef.detectChanges();
        }
    };
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subscriptions.push(this.eventResponse.subscribe(function (res) {
            _this.appear = false;
            _this.disappear = true;
            _this.disabled = true;
            if (_this._previousFocus) {
                _this._previousFocus.focus();
            }
            _this.changeDetectorRef.markForCheck();
            _this.changeDetectorRef.detectChanges();
        }));
    };
    AlertComponent.prototype.ngAfterViewInit = function () {
        if (document.hasFocus() && document.activeElement) {
            this._previousFocus = document.activeElement;
        }
        var btnFocused = this.elementRef.nativeElement.querySelector('button');
        if (btnFocused) {
            btnFocused.focus();
        }
    };
    AlertComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this._closeTimeOut);
        this._subscriptions.forEach(function (i) { return i.unsubscribe(); });
    };
    AlertComponent.prototype.buttonClick = function (buttonType) {
        var alertResponse = {
            request: this.request,
            responseButton: buttonType,
            confirm: buttonType.isConfirm
        };
        this.emitResponse(alertResponse);
    };
    AlertComponent.prototype.keyUp = function ($event) {
        if ($event.keyCode === 27) {
            this.buttonClick(this.cancelButton);
        }
    };
    AlertComponent.prototype.overlayClick = function () {
        if (this.options.overlayClickToCancel) {
            this.buttonClick(this.cancelButton);
        }
    };
    AlertComponent.prototype.emitResponse = function (alertResponse) {
        this._resSubject.next(alertResponse);
        this._resSubject.complete();
    };
    return AlertComponent;
}());
AlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-alert',
                template: "<ng-container *ngIf=\"request && options\">\n  <div class=\"backdrop\"\n       *ngIf=\"options.overlay\"\n       [ngClass]=\"{ appear: appear, disappear: disappear}\"\n       (click)=\"overlayClick()\"></div>\n  <div class=\"alert\"\n       [ngClass]=\"{ appear: appear, disappear: disappear}\">\n    <div class=\"button-close\" *ngIf=\"options.showCloseButton\" (click)=\"buttonClick(cancelButton)\">x</div>\n    <div class=\"icon-container\">\n      <svg *ngIf=\"request.iconType === IconType.DANGER\" class=\"alert-icon\"\n           xmlns=\"http://www.w3.org/2000/svg\"\n           viewBox=\"0 0 512 512\"><title>error</title>\n        <path\n          d=\"M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z\"\n          style=\"fill:#ed1c24\"/>\n        <line x1=\"131\" y1=\"381\" x2=\"381\" y2=\"131\"\n              style=\"fill:none;stroke:#ed1c24;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px\"/>\n        <line x1=\"131\" y1=\"131\" x2=\"381\" y2=\"381\"\n              style=\"fill:none;stroke:#ed1c24;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px\"/>\n      </svg>\n      <svg *ngIf=\"request.iconType === IconType.INFO\" class=\"alert-icon\"\n           xmlns=\"http://www.w3.org/2000/svg\"\n           viewBox=\"0 0 512 512\"><title>info</title>\n        <path\n          d=\"M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z\"\n          style=\"fill:#0071bc\"/>\n        <circle cx=\"256\" cy=\"105\" r=\"19\"\n                style=\"fill:#0071bc;stroke:#0071bc;stroke-miterlimit:10;stroke-width:20px\"/>\n        <line x1=\"256\" y1=\"176\" x2=\"256\" y2=\"426\"\n              style=\"fill:none;stroke:#0071bc;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px\"/>\n      </svg>\n      <svg *ngIf=\"request.iconType === IconType.SUCCESS\" class=\"alert-icon\"\n           xmlns=\"http://www.w3.org/2000/svg\"\n           viewBox=\"0 0 512 512\"><title>success</title>\n        <path\n          d=\"M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z\"\n          style=\"fill:#009245\"/>\n        <polyline points=\"405 174 224 361 115 256\"\n                  style=\"fill:none;stroke:#39b54a;stroke-linecap:round;stroke-linejoin:round;stroke-width:40px\"/>\n      </svg>\n      <svg *ngIf=\"request.iconType === IconType.WARNING\" class=\"alert-icon\"\n           xmlns=\"http://www.w3.org/2000/svg\"\n           viewBox=\"0 0 512 512\"><title>warning</title>\n        <path\n          d=\"M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z\"\n          style=\"fill:#fbb03b\"/>\n        <circle cx=\"256\" cy=\"407\" r=\"19\"\n                style=\"fill:#fbb03b;stroke:#fbb03b;stroke-miterlimit:10;stroke-width:20px\"/>\n        <line x1=\"256\" y1=\"86\" x2=\"256\" y2=\"336\"\n              style=\"fill:none;stroke:#fbb03b;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px\"/>\n      </svg>\n      <img *ngIf=\"request.iconType?.src\" class=\"{{request.iconType?.classes}}\" src=\"{{request.iconType?.src}}\" alt=\"\">\n    </div>\n    <div class=\"caption\"> {{ request.caption }}</div>\n    <div class=\"description\"> {{ request.text }}</div>\n    <ng-template [ngTemplateOutlet]=\"request.templateRef\"\n                 [ngTemplateOutletContext]=\"{alert: this}\"></ng-template>\n    <div class=\"buttons-container\">\n      <button *ngFor=\"let button of buttons\"\n              class=\"{{ button.classes }}\"\n              (click)=\"buttonClick(button)\">\n        {{ button.title }}\n      </button>\n    </div>\n  </div>\n</ng-container>\n",
                styles: [":host.disabled{pointer-events:none}"],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
AlertComponent.ctorParameters = function () { return [
    { type: Injector, },
]; };
AlertComponent.propDecorators = {
    "disabled": [{ type: HostBinding, args: ['class.disabled',] },],
    "keyUp": [{ type: HostListener, args: ['window:keyup', ['$event'],] },],
};
var ALERT_BUTTONS = [
    { isConfirm: false, classes: 'd-none', type: AlertButtonType.NONE },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Yes', type: AlertButtonType.YES },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Ok', type: AlertButtonType.OK },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Retry', type: AlertButtonType.RETRY },
    { isConfirm: false, classes: 'btn btn-primary', title: 'No', type: AlertButtonType.NO },
    { isConfirm: false, classes: 'btn btn-primary', title: 'Abort', type: AlertButtonType.ABORT },
    { isConfirm: false, classes: 'btn btn-secondary', title: 'Cancel', type: AlertButtonType.CANCEL },
    { isConfirm: false, classes: 'btn btn-secondary', title: 'Ignore', type: AlertButtonType.IGNORE },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Confirm', type: AlertButtonType.CONFIRM },
    { isConfirm: true, classes: 'btn btn-primary', title: 'Allow', type: AlertButtonType.ALLOW },
    { isConfirm: false, classes: 'btn btn-primary', title: 'Deny', type: AlertButtonType.DENY },
];
var DEFAULT_OPTIONS = {
    overlay: true,
    overlayClickToCancel: true,
    showCloseButton: true,
    duration: null
};
var DEFAULT_CONFIG = {
    componentRef: AlertComponent,
    options: DEFAULT_OPTIONS,
    alertButtonsResource: ALERT_BUTTONS,
    rootElement: document.body,
    timeoutBeforeDestroy: 600
};
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
            .subscribe(function (e) { return setTimeout(function () { return _this._destroyComponent(componentRef); }, req.timeoutBeforeDestroy); });
        return componentRef.instance.eventResponse;
    };
    AlertService.prototype._appendComponentToAppRoot = function (component) {
        var componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        var domElem = (((componentRef.hostView))
            .rootNodes[0]);
        this.alertConfig.rootElement.appendChild(domElem);
        return componentRef;
    };
    AlertService.prototype._destroyComponent = function (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    };
    return AlertService;
}());
AlertService.decorators = [
    { type: Injectable },
];
AlertService.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: IAlertConfig, decorators: [{ type: Inject, args: ['alertConfig',] },] },
    { type: Injector, },
]; };
var AlertModule = /** @class */ (function () {
    function AlertModule() {
    }
    AlertModule.forRoot = function (alertConfig) {
        return {
            ngModule: AlertModule,
            providers: [
                AlertService,
                { provide: 'alertConfig', useValue: Object.assign(DEFAULT_CONFIG, alertConfig) }
            ]
        };
    };
    return AlertModule;
}());
AlertModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [AlertComponent],
                entryComponents: [AlertComponent],
                exports: [AlertComponent]
            },] },
];
AlertModule.ctorParameters = function () { return []; };

export { IconType, AlertButtonType, IAlertButton, IAlertIcon, IAlertResponse, IAlertConfig, ALERT_BUTTONS, DEFAULT_OPTIONS, DEFAULT_CONFIG, AlertModule, AlertService, AlertComponent as ɵa };
//# sourceMappingURL=ks-ng-alert.js.map
