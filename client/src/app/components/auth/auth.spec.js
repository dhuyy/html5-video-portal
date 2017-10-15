(function() {
  'use strict';

  /**
   * Unit testing AuthService
   */
  describe('[AuthService]', function() {
    var authService, httpBackend, serverAddress;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_AuthService_, $httpBackend, _SERVER_) {
      authService = _AuthService_;
      httpBackend = $httpBackend;
      serverAddress = _SERVER_.ADDRESS;
    }));

    it('should authenticate an user when promise is resolved', function() {
      httpBackend.when('POST', serverAddress + '/user/auth').respond(200, {
        "status": "success",
        "sessionId": "XSZ7pv4it1rMaEYK8FWe6oEDvpMSyuIK",
        "username": "ali"
      });

      var fetchedData;
      authService.auth('ali', 'password')
        .then(function(response) {
          fetchedData = response;
        })
      ;
      httpBackend.flush();

      expect(fetchedData.status).toEqual(200);
      expect(fetchedData.data).toEqual(jasmine.any(Object));
      expect(fetchedData.data.username).toEqual("ali");

    });

    it('should logout an user when promise is resolved', function() {
      httpBackend.when('GET', serverAddress + '/user/logout?sessionId=a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV').respond(200, {
        "status": "success"
      });

      var fetchedData;
      authService.logout('a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV')
        .then(function(response) {
          fetchedData = response;
        })
      ;
      httpBackend.flush();

      expect(fetchedData.status).toEqual(200);
      expect(fetchedData.data).toEqual(jasmine.any(Object));
      expect(fetchedData.data.status).toEqual("success");

    });

  });
})();
