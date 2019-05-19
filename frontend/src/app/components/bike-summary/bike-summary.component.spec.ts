import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeSummaryComponent } from './bike-summary.component';

describe('BikeSummaryComponent', () => {
  let component: BikeSummaryComponent;
  let fixture: ComponentFixture<BikeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
