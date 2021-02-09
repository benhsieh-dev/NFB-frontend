import { TestBed } from '@angular/core/testing';

import { NFBFormService } from './nfbform.service';

describe('NFBFormService', () => {
  let service: NFBFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NFBFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
