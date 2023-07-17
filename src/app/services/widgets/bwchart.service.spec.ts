import { TestBed } from '@angular/core/testing';

import { BwchartService } from './bwchart.service';

describe('BwchartService', () => {
  let service: BwchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BwchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
