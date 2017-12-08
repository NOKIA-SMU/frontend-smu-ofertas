import { TestBed, inject } from '@angular/core/testing';

import { SuppliesService } from './supplies.service';

describe('SuppliesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuppliesService]
    });
  });

  it('should be created', inject([SuppliesService], (service: SuppliesService) => {
    expect(service).toBeTruthy();
  }));
});
