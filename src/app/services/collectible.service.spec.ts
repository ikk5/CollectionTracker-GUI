import { TestBed } from '@angular/core/testing';

import { CollectibleService } from './collectible.service';

describe('CollectibleService', () => {
  let service: CollectibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
