import { TestBed } from '@angular/core/testing';

import { LoadScriptsService } from './load-scripts.service';

describe('LoadScriptsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadScriptsService = TestBed.get(LoadScriptsService);
    expect(service).toBeTruthy();
  });
});
