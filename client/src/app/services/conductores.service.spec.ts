import { TestBed } from '@angular/core/testing';

import { ConductoresService } from './conductores.service';

describe('ConductoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConductoresService = TestBed.get(ConductoresService);
    expect(service).toBeTruthy();
  });
});
