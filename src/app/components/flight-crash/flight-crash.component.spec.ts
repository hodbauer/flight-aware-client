import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCrashComponent } from './flight-crash.component';

describe('FlightCrashComponent', () => {
  let component: FlightCrashComponent;
  let fixture: ComponentFixture<FlightCrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightCrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
