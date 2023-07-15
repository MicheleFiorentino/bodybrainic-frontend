import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BwdetailsComponent } from './bwdetails.component';

describe('BwdetailsComponent', () => {
  let component: BwdetailsComponent;
  let fixture: ComponentFixture<BwdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BwdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BwdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
