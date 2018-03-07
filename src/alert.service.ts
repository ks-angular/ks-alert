import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { IAlertRequest, IAlertResponse } from './alert.interfaces';
import { Observable } from 'rxjs/Observable';
import { AlertComponent } from './alert.component';
import { ComponentRef } from '@angular/core/src/linker/component_factory';

@Injectable()
export class AlertService {

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {
    }

    create(req: IAlertRequest): Observable<IAlertResponse> {
        if (req.componentRef === undefined || req.componentRef === null) {
            req.componentRef = AlertComponent;
        }
        const componentRef = this._appendComponentToAppRoot(req.componentRef);
        componentRef.instance.config(req);

        componentRef.instance.eventResponse.subscribe(e => this._destroyComponent(componentRef));

        return componentRef.instance.eventResponse;
    }

    private _appendComponentToAppRoot(component: typeof AlertComponent): ComponentRef<AlertComponent> {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // Append DOM element to the body
        document.body.appendChild(domElem);

        return componentRef;
    }

    private _destroyComponent(componentRef: ComponentRef<AlertComponent>): void {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }


}
