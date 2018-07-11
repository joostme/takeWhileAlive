import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'twa-example-bad',
  templateUrl: './example-bad.component.html',
  styleUrls: ['./example-bad.component.scss']
})
export class ExampleBadComponent {
    counter = 0;

    constructor() {
        timer(1000, 1000)
        .subscribe(num => {
            console.log(num);
            this.counter = num;
        });
    }

}
