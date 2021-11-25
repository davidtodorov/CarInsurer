import { TestBed } from '@angular/core/testing';

import { InstallmentsService } from './installments.service';

describe('InstallmentsService', () => {
  let service: InstallmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
