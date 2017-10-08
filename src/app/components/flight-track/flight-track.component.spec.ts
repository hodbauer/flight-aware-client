import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTrackComponent } from './flight-track.component';

describe('FlightTrackComponent', () => {
  let component: FlightTrackComponent;
  let fixture: ComponentFixture<FlightTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
