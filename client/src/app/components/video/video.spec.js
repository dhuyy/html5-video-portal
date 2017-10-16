(function() {
  'use strict';

  /**
   * Unit testing AuthService
   */
  describe('[VideoService]', function() {
    var videoService, httpBackend, serverAddress;

    beforeEach(module('crossoverAssignment'));
    beforeEach(inject(function(_VideoService_, $httpBackend, _SERVER_) {
      videoService = _VideoService_;
      httpBackend = $httpBackend;
      serverAddress = _SERVER_.ADDRESS;
    }));

    it('should get a list of videos based on the skip and limit parameters', function() {
      var sessionId = '3xClYJILxIVDTYS8bNi70CcLYZV0up1H';
      var skip = 0;
      var limit = 10;

      httpBackend.when('GET', serverAddress + '/videos?limit=' + limit + '&sessionId=' + sessionId + '&skip=' + skip)
        .respond(200, {
        'status': 'success',
        'data': []
      });

      var fetchedData;
      videoService.getVideos(sessionId, 0, 10)
        .then(function(response) {
          fetchedData = response;
        })
      ;
      httpBackend.flush();

      expect(fetchedData.status).toEqual(200);
      expect(fetchedData.data.data).toEqual(jasmine.any(Array));

    });

  });
})();
