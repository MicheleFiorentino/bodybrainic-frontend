import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BwchartComponent } from './bwchart.component';

describe('BwchartComponent', () => {
  let component: BwchartComponent;
  let fixture: ComponentFixture<BwchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BwchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BwchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
