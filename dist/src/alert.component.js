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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var alert_interfaces_1 = require("./alert.interfaces");
var Subject_1 = require("rxjs/Subject");
var AlertComponent = /** @class */ (function () {
    function AlertComponent(injector) {
        this.injector = injector;
        this.IconType = alert_interfaces_1.IconType;
        this.cancelButton = { isConfirm: false, type: alert_interfaces_1.AlertButtonType.CANCEL };
        this.appear = false;
        this.disappear = false;
        this.elementRef = injector.get(core_1.ElementRef);
        this.changeDetectorRef = injector.get(core_1.ChangeDetectorRef);
        this.alertConfig = injector.get('alertConfig', {});
        this.disabled = true;
        this.request = {};
        this.options = Object.assign({}, this.alertConfig.options);
        this._subscriptions = [];
        this._resSubject = new Subject_1.Subject();
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
                    if (alert_interfaces_1.AlertButtonType.hasOwnProperty(i.toString())) {
                        _this.buttons.push(_this.alertConfig.alertButtonsResource[+i]);
                    }
                    else if (i instanceof alert_interfaces_1.IAlertButton) {
                        _this.buttons.push(i);
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
    __decorate([
        core_1.HostBinding('class.disabled'),
        __metadata("design:type", Boolean)
    ], AlertComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AlertComponent.prototype, "keyUp", null);
    AlertComponent = __decorate([
        core_1.Component({
            selector: 'ks-alert',
            templateUrl: './alert.component.html',
            styleUrls: ['./alert.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], AlertComponent);
    return AlertComponent;
}());
exports.AlertComponent = AlertComponent;
//# sourceMappingURL=alert.component.js.map