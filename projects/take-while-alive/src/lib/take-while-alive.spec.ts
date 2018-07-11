import { takeWhileAlive, AutoUnsubscribe } from "./take-while-alive";
import { Subject } from "rxjs";

describe('takeWhileAlive', () => {
    it('sets the __isComponentAlive property', () => {
        const component = {};
        takeWhileAlive(component);

        expect(component['__isComponentAlive']).toBe(true);
    });
    it('sets the __isComponentAlive property to false on destroy', () => {
        const component: any = {};
        takeWhileAlive(component);

        expect(component.__isComponentAlive).toBe(true);
        component.ngOnDestroy();

        expect(component.__isComponentAlive).toBe(false);
    });
    it('calls existing ngOnDestroy function', () => {
        const component: any = {
            ngOnDestroy: () => null
        };
        takeWhileAlive(component);

        const ngOnDestroySpy = spyOn(component, 'ngOnDestroy');
        component.ngOnDestroy();

        expect(ngOnDestroySpy).toHaveBeenCalled();
    });
    it('closes the observable on destroy', () => {
        const source = new Subject();
        const component: any = {};
        let closed = false;
        source.pipe(
            takeWhileAlive(component)
        )
        .subscribe(() => {}, () => {}, () => closed = true);

        component.ngOnDestroy();
        source.next();

        expect(closed).toBe(true);
    });
});


describe('AutoUnsubscribe', () => {
    it('sets ngOnDestroy on prototype if it not exists', ()=> {
        @AutoUnsubscribe()
        class TestClass {}

        const testClass = new TestClass();

        expect(testClass['ngOnDestroy']).not.toBeUndefined();
    });
    it('keeps ngOnDestroy if it exists', ()=> {
        @AutoUnsubscribe()
        class TestClass {
            ngOnDestroy() {}
        }

        const testClass = new TestClass();

        expect(testClass.ngOnDestroy).not.toBeUndefined();

        const ngOnDestroySpy = spyOn(testClass, 'ngOnDestroy');

        testClass.ngOnDestroy();
        expect(ngOnDestroySpy).toHaveBeenCalled();
    });
});
