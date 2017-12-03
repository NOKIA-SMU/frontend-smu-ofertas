import { TestBed, inject } from '@angular/core/testing';

import { SubsystemsService } from './subsystems.service';

describe('SubsystemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubsystemsService]
    });
  });

  it('should be created', inject([SubsystemsService], (service: SubsystemsService) => {
    expect(service).toBeTruthy();
  }));
});
