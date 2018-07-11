import { Component } from '@angular/core';
import { timer } from 'node_modules/rxjs';
import { AutoUnsubscribe, takeWhileAlive } from 'takeWhileAlive';

@Component({
    selector: 'twa-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
@AutoUnsubscribe()
export class ExampleComponent {

    counter = 0;

    constructor() {
        timer(1000, 1000)
        .pipe(
            takeWhileAlive(this)
        )
        .subscribe(num => {
            console.log(num);
            this.counter = num;
        });
    }
}
