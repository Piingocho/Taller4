import { TestBed, async, inject } from '@angular/core/testing';

import { LogininvGuard } from './logininv.guard';

describe('LogininvGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogininvGuard]
    });
  });

  it('should ...', inject([LogininvGuard], (guard: LogininvGuard) => {
    expect(guard).toBeTruthy();
  }));
});
