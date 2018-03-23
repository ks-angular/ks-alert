import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { IAlertConfig, IAlertRequest, IAlertResponse } from './alert.interfaces';
import { Observable } from 'rxjs/Observable';
export declare class AlertService {
    private componentFactoryResolver;
    private appRef;
    private alertConfig;
    private injector;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, alertConfig: IAlertConfig, injector: Injector);
    create(req: IAlertRequest): Observable<IAlertResponse>;
    private _appendComponentToAppRoot(component);
    private _destroyComponent(componentRef);
}
