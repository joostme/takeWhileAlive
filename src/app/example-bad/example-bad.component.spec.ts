import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleBadComponent } from './example-bad.component';

describe('ExampleBadComponent', () => {
  let component: ExampleBadComponent;
  let fixture: ComponentFixture<ExampleBadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleBadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleBadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
