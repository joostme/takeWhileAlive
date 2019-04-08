# TakeWhileAlive
[![Build Status](https://travis-ci.org/joostme/takeWhileAlive.svg?branch=master)](https://travis-ci.org/joostme/takeWhileAlive)
[![npm version](https://badge.fury.io/js/take-while-alive.svg)](https://badge.fury.io/js/take-while-alive)
## Dependencies

Requires RxJs >= 6.0.0

## Installation

```
npm install take-while-alive
```

## What it does

Automatically unsubscribe any active subscriptions inside Angular components/services using a custom operator.
In the background the `takeWhile` RxJs operator is used.

This prevents leaks that are caused by subscriptions that are still alive even when the component was already destroyed.

## How to use it

> Before

```ts
@Component({
    selector: 'twa-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

    counter = 0;

    constructor() {
        timer(1000, 1000)
        .subscribe(num => {
            this.counter = num;
        });
    }
}

```

> After

```ts
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';

...

@Component({
    selector: 'twa-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
@AutoUnsubscribe() // <<< Add @AutoUnsubsribe() Decorator
export class ExampleComponent {

    counter = 0;

    constructor() {
        timer(1000, 1000)
        .pipe(
            takeWhileAlive(this) // <<< Add takeWhileAlive(this) operator
        )
        .subscribe(num => {
            this.counter = num;
        });
    }
}

```

## How it works

The `@AutoUnsubscribe()` decorator adds a `__isComponentAlive` property to the component and creates a `ngOnDestroy()` function on the class prototype if it not exists. (This is needed because Angular won't call the function if it is not on the prototype when the component class is instantiated)

The `takeWhileAlive(...)` operator is basically a `takeWhile` operator that unsubscribes when the `__isComponentAlive` is `false`. When `ngOnDestroy()` is called the `__isComponentAlive` is set to `false`. MAGIC!
