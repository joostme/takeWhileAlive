import { MonoTypeOperatorFunction } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


export function takeWhileAlive<T>(component: any): MonoTypeOperatorFunction<T> {
    component.__isComponentAlive = true;
    const oldNgOnDestroy: Function = component.ngOnDestroy;

    component.ngOnDestroy = function () {
        if (oldNgOnDestroy) {
            oldNgOnDestroy.apply(component);
        }
        component.__isComponentAlive = false;
    };

    return takeWhile<T>(() => component.__isComponentAlive);
}


export function AutoUnsubscribe(): ClassDecorator {
    return target => {
        const original = target.prototype.ngOnDestroy;

        target.prototype.ngOnDestroy = function () {
            if (original) {
                original.apply(this, arguments);
            }
        };
    };
}
