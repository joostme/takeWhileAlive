import { MonoTypeOperatorFunction } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const isAlivePropName = '__isComponentAlive';

export function takeWhileAlive<T>(component: any): MonoTypeOperatorFunction<T> {
    return takeWhile<T>(() => component[isAlivePropName]);
}


export function AutoUnsubscribe(): ClassDecorator {
    return target => {
        const proto = target.prototype;
        const originalNgOnDestroy: Function = proto.ngOnDestroy;

        proto[isAlivePropName] = true;
        target.prototype.ngOnDestroy = function () {
            if (originalNgOnDestroy) {
                originalNgOnDestroy.apply(this);
            }
            this[isAlivePropName] = false;
        };
    };
}
