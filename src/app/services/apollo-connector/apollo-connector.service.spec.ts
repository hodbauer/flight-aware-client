import { TestBed, inject } from '@angular/core/testing';

import { ApolloConnectorService } from './apollo-connector.service';

describe('ApolloConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApolloConnectorService]
    });
  });

  it('should be created', inject([ApolloConnectorService], (service: ApolloConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
