import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Injector, ApplicationRef, ComponentFactoryResolver, Inject, Injectable, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const IconType = {
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
/** @enum {number} */
const AlertButtonType = {
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
class IAlertButton {
}
class IAlertIcon {
}
/**
 * @record
 */

/**
 * @record
 */

class IAlertResponse {
}
class IAlertConfig {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AlertComponent {
    /**
     * @param {?} injector
     */
    constructor(injector) {
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
    /**
     * @param {?} request
     * @return {?}
     */
    config(request) {
        clearTimeout(this._closeTimeOut);
        if (request) {
            this.request = request;
            if (request.options) {
                this.options = Object.assign({}, this.alertConfig.options, request.options);
                if (request.options.duration) {
                    this._closeTimeOut = setTimeout(() => {
                        this.buttonClick(this.cancelButton);
                    }, request.options.duration);
                }
            }
            else {
                this.options = Object.assign({}, this.alertConfig.options);
            }
            this.buttons = [];
            if (this.request.alertButtons) {
                this.request.alertButtons.forEach((i) => {
                    if (AlertButtonType.hasOwnProperty(i.toString())) {
                        this.buttons.push(this.alertConfig.alertButtonsResource[+i]);
                    }
                    else if (i instanceof IAlertButton) {
                        this.buttons.push(/** @type {?} */ (i));
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._subscriptions.push(this.eventResponse.subscribe((res) => {
            this.appear = false;
            this.disappear = true;
            this.disabled = true;
            if (this._previousFocus) {
                this._previousFocus.focus();
            }
            this.changeDetectorRef.markForCheck();
            this.changeDetectorRef.detectChanges();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (document.hasFocus() && document.activeElement) {
            this._previousFocus = document.activeElement;
        }
        const /** @type {?} */ btnFocused = this.elementRef.nativeElement.querySelector('button');
        if (btnFocused) {
            btnFocused.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        clearTimeout(this._closeTimeOut);
        this._subscriptions.forEach(i => i.unsubscribe());
    }
    /**
     * @param {?} buttonType
     * @return {?}
     */
    buttonClick(buttonType) {
        const /** @type {?} */ alertResponse = {
            request: this.request,
            responseButton: buttonType,
            confirm: buttonType.isConfirm
        };
        this.emitResponse(alertResponse);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    keyUp($event) {
        if ($event.keyCode === 27) {
            this.buttonClick(this.cancelButton);
        }
    }
    /**
     * @return {?}
     */
    overlayClick() {
        if (this.options.overlayClickToCancel) {
            this.buttonClick(this.cancelButton);
        }
    }
    /**
     * @param {?} alertResponse
     * @return {?}
     */
    emitResponse(alertResponse) {
        this._resSubject.next(alertResponse);
        this._resSubject.complete();
    }
}
AlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-alert',
                template: `<ng-container *ngIf="request && options">
  <div class="backdrop"
       *ngIf="options.overlay"
       [ngClass]="{ appear: appear, disappear: disappear}"
       (click)="overlayClick()"></div>
  <div class="alert"
       [ngClass]="{ appear: appear, disappear: disappear}">
    <div class="button-close" *ngIf="options.showCloseButton" (click)="buttonClick(cancelButton)">x</div>
    <div class="icon-container">
      <svg *ngIf="request.iconType === IconType.DANGER" class="alert-icon"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 512 512"><title>error</title>
        <path
          d="M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
          style="fill:#ed1c24"/>
        <line x1="131" y1="381" x2="381" y2="131"
              style="fill:none;stroke:#ed1c24;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px"/>
        <line x1="131" y1="131" x2="381" y2="381"
              style="fill:none;stroke:#ed1c24;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px"/>
      </svg>
      <svg *ngIf="request.iconType === IconType.INFO" class="alert-icon"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 512 512"><title>info</title>
        <path
          d="M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
          style="fill:#0071bc"/>
        <circle cx="256" cy="105" r="19"
                style="fill:#0071bc;stroke:#0071bc;stroke-miterlimit:10;stroke-width:20px"/>
        <line x1="256" y1="176" x2="256" y2="426"
              style="fill:none;stroke:#0071bc;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px"/>
      </svg>
      <svg *ngIf="request.iconType === IconType.SUCCESS" class="alert-icon"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 512 512"><title>success</title>
        <path
          d="M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
          style="fill:#009245"/>
        <polyline points="405 174 224 361 115 256"
                  style="fill:none;stroke:#39b54a;stroke-linecap:round;stroke-linejoin:round;stroke-width:40px"/>
      </svg>
      <svg *ngIf="request.iconType === IconType.WARNING" class="alert-icon"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 512 512"><title>warning</title>
        <path
          d="M256,30a226.06,226.06,0,0,1,88,434.25A226.06,226.06,0,0,1,168,47.75,224.5,224.5,0,0,1,256,30m0-30C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0Z"
          style="fill:#fbb03b"/>
        <circle cx="256" cy="407" r="19"
                style="fill:#fbb03b;stroke:#fbb03b;stroke-miterlimit:10;stroke-width:20px"/>
        <line x1="256" y1="86" x2="256" y2="336"
              style="fill:none;stroke:#fbb03b;stroke-linecap:round;stroke-miterlimit:10;stroke-width:40px"/>
      </svg>
      <img *ngIf="request.iconType?.src" class="{{request.iconType?.classes}}" src="{{request.iconType?.src}}" alt="">
    </div>
    <div class="caption"> {{ request.caption }}</div>
    <div class="description"> {{ request.text }}</div>
    <ng-template [ngTemplateOutlet]="request.templateRef"
                 [ngTemplateOutletContext]="{alert: this}"></ng-template>
    <div class="buttons-container">
      <button *ngFor="let button of buttons"
              class="{{ button.classes }}"
              (click)="buttonClick(button)">
        {{ button.title }}
      </button>
    </div>
  </div>
</ng-container>
`,
                styles: [`:host.disabled{pointer-events:none}`],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AlertComponent.ctorParameters = () => [
    { type: Injector, },
];
AlertComponent.propDecorators = {
    "disabled": [{ type: HostBinding, args: ['class.disabled',] },],
    "keyUp": [{ type: HostListener, args: ['window:keyup', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const ALERT_BUTTONS = [
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
const DEFAULT_OPTIONS = {
    overlay: true,
    overlayClickToCancel: true,
    showCloseButton: true,
    duration: null
};
const DEFAULT_CONFIG = {
    componentRef: AlertComponent,
    options: DEFAULT_OPTIONS,
    alertButtonsResource: ALERT_BUTTONS,
    rootElement: document.body,
    timeoutBeforeDestroy: 600
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AlertService {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} alertConfig
     * @param {?} injector
     */
    constructor(componentFactoryResolver, appRef, alertConfig, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.alertConfig = alertConfig;
        this.injector = injector;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    create(req) {
        if (req.componentRef === undefined || req.componentRef === null) {
            req.componentRef = this.alertConfig.componentRef;
        }
        if (req.timeoutBeforeDestroy === undefined || req.timeoutBeforeDestroy === null) {
            req.timeoutBeforeDestroy = this.alertConfig.timeoutBeforeDestroy;
        }
        const /** @type {?} */ componentRef = this._appendComponentToAppRoot(req.componentRef);
        componentRef.instance.config(req);
        componentRef.instance.eventResponse
            .subscribe(e => setTimeout(() => this._destroyComponent(componentRef), req.timeoutBeforeDestroy));
        return componentRef.instance.eventResponse;
    }
    /**
     * @param {?} component
     * @return {?}
     */
    _appendComponentToAppRoot(component) {
        const /** @type {?} */ componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const /** @type {?} */ domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView))
            .rootNodes[0]);
        this.alertConfig.rootElement.appendChild(domElem);
        return componentRef;
    }
    /**
     * @param {?} componentRef
     * @return {?}
     */
    _destroyComponent(componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
AlertService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AlertService.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: IAlertConfig, decorators: [{ type: Inject, args: ['alertConfig',] },] },
    { type: Injector, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AlertModule {
    /**
     * @param {?=} alertConfig
     * @return {?}
     */
    static forRoot(alertConfig) {
        return {
            ngModule: AlertModule,
            providers: [
                AlertService,
                { provide: 'alertConfig', useValue: Object.assign(DEFAULT_CONFIG, alertConfig) }
            ]
        };
    }
}
AlertModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [AlertComponent],
                entryComponents: [AlertComponent],
                exports: [AlertComponent]
            },] },
];
/** @nocollapse */
AlertModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { IconType, AlertButtonType, IAlertButton, IAlertIcon, IAlertResponse, IAlertConfig, ALERT_BUTTONS, DEFAULT_OPTIONS, DEFAULT_CONFIG, AlertModule, AlertService, AlertComponent as ɵa };
//# sourceMappingURL=ks-ng-alert.js.map
