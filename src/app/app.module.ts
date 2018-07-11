import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { ExampleBadComponent } from './example-bad/example-bad.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    ExampleBadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
