import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    HostBinding,
    HostListener,
    OnDestroy,
    OnInit
} from '@angular/core';
import { AlertButtonType, AlertType, IAlertButton, IAlertOptions, IAlertRequest, IAlertResponse } from './alert.interfaces';
import { Subscription } from 'rxjs/Subscription';
import { ALERT_BUTTONS, DEFAULT_OPTIONS } from './alert.constants';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'ks-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {

    AlertType = AlertType;

    private _subscriptions: Subscription[];
    private _closeTimeOut;

    protected _resSubject: Subject<IAlertResponse>;
    public readonly eventResponse: Observable<IAlertResponse>;

    public request: IAlertRequest;
    public options: IAlertOptions;
    public buttons: IAlertButton[];

    @HostBinding('class.active') public active: boolean;

    constructor(protected _elementRef: ElementRef,
                protected _changeDetectorRef: ChangeDetectorRef) {
        this.active = false;
        this.request = {};
        this.options = DEFAULT_OPTIONS;
        this._subscriptions = [];

        this._resSubject = new Subject();
        this.eventResponse = this._resSubject.asObservable();
    }

    public config(request: IAlertRequest): void {
        clearTimeout(this._closeTimeOut);
        if (request) {
            this.request = request;

            if (request.options) {
                this.options = Object.assign(DEFAULT_OPTIONS, request.options);
                if (request.options.duration) {
                    this._closeTimeOut = setTimeout(() => {
                        this.buttonClick({type: AlertButtonType.CANCEL});
                    }, request.options.duration);
                }
            } else {
                this.options = DEFAULT_OPTIONS;
            }

            this.buttons = [];
            if (this.request.alertButtons) {
                this.request.alertButtons.forEach((i) => {
                    if (AlertButtonType.hasOwnProperty(i.toString())) {
                        this.buttons.push(ALERT_BUTTONS[+i]);
                    } else if (i instanceof IAlertButton) {
                        this.buttons.push(i as IAlertButton);
                    } else {
                        throw {
                            message: 'Alert Button isn\'t recognize. Make sure that alert button is instance of AlertType or IAlertButton.',
                            object: i
                        };
                    }
                });
            }

            this.active = true;
            this._changeDetectorRef.markForCheck();
            this._changeDetectorRef.detectChanges();
        }
    }

    ngOnInit() {
        this._subscriptions.push(
            this.eventResponse.subscribe((res) => {
                this.active = false;
            }));
    }

    ngAfterViewInit() {
        const btnFocused = this._elementRef.nativeElement.querySelector('button');
        if (btnFocused) {
            btnFocused.focus();
        }
    }

    ngOnDestroy() {
        clearTimeout(this._closeTimeOut);
        this._subscriptions.forEach(i => i.unsubscribe());
    }

    buttonClick(buttonType: IAlertButton) {
        const alertResponse: IAlertResponse = {
            request: this.request,
            responseButton: buttonType,
            confirm: (buttonType.type === AlertButtonType.CONFIRM ||
                buttonType.type === AlertButtonType.YES ||
                buttonType.type === AlertButtonType.OK ||
                buttonType.type === AlertButtonType.ALLOW ||
                buttonType.type === AlertButtonType.RETRY)
        };

        this.emitResponse(alertResponse);
    }

    @HostListener('window:keyup', ['$event'])
    keyUp($event) {
        if ($event.keyCode === 27) {
            this.buttonClick({type: AlertButtonType.CANCEL});
        }
    }

    overlayClick() {
        if (this.options.overlayClickToCancel) {
            this.buttonClick({type: AlertButtonType.CANCEL});
        }
    }

    emitResponse(alertResponse: IAlertResponse) {
        this._resSubject.next(alertResponse);
        this._resSubject.complete();
    }

}
