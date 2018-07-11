import { Component } from '@angular/core';

@Component({
    selector: 'twa-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    exampleAlive = true;

    switchExample() {
        this.exampleAlive = !this.exampleAlive;
    }
}
