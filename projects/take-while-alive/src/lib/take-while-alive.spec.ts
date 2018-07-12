import { takeWhileAlive, AutoUnsubscribe } from './take-while-alive';
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@AutoUnsubscribe()
class TestClass { }

@AutoUnsubscribe()
class TestClassWithDestroy implements OnDestroy {
    public destroyCalled = false;
    ngOnDestroy() {
        this.destroyCalled = true;
    }
}

describe('takeWhileAlive', () => {
    it('closes the observable on destroy', () => {
        const source = new Subject();
        const component: any = new TestClass();
        let closed = false;
        source.pipe(
            takeWhileAlive(component)
        )
        .subscribe(() => { }, () => { }, () => closed = true);

        component.ngOnDestroy();
        source.next();

        expect(closed).toBe(true);
    });
});


describe('AutoUnsubscribe', () => {
    it('sets the __isComponentAlive property', () => {
        const component = new TestClass();

        expect(component['__isComponentAlive']).toBe(true);
    });
    it('sets the __isComponentAlive property to false on destroy', () => {
        const component: any = new TestClass();

        expect(component.__isComponentAlive).toBe(true);
        component.ngOnDestroy();

        expect(component.__isComponentAlive).toBe(false);
    });
    it('sets ngOnDestroy on prototype if it not exists', () => {
        const component = new TestClass();

        expect(component['ngOnDestroy']).not.toBeUndefined();
    });
    it('keeps ngOnDestroy if it exists', () => {
        const component = new TestClassWithDestroy();
        expect(component.destroyCalled).toBe(false);

        expect(component.ngOnDestroy).not.toBeUndefined();

        const ngOnDestroySpy = spyOn(component, 'ngOnDestroy').and.callThrough();

        component.ngOnDestroy();
        expect(ngOnDestroySpy).toHaveBeenCalled();
        expect(component.destroyCalled).toBe(true);
    });
});
