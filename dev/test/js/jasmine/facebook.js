describe('facebook', function() {
    beforeEach(module('facebook'));

    var rootScope, window, facebook;

    describe('-> $facebook', function() {
        beforeEach(inject(function($rootScope, $window, $facebook) {
            rootScope = $rootScope;
            window = $window;
            facebook = $facebook;
        }));

        describe('-> init', function() {
            it('should be defined', function() {
                expect(facebook.init).toBeDefined();
            });
        });

        describe('-> api', function() {
            it('should be defined', function() {
                expect(facebook.api).toBeDefined();
            });

            it('should call FB.api with args', function() {
                var thruArgs = null;
                spyOn(FB, 'api').andCallFake(function(args){
                    thruArgs = args;
                });
                facebook.api('/me');
                expect(thruArgs).toBe('/me');
            });

            it('should reject errors', function() {
                var expected = {error: {}};
                spyOn(FB, 'api').andCallFake(function(args, callback) {
                    callback(expected);
                });
                var result = null;
                facebook.api('/me').then(null, function(error) {
                    console.log(error);
                    result = error;
                });
                rootScope.$apply();
                expect(result).toBe(expected);
            });

            it('should resolve responses', function() {
                var expected = {success: {}};
                spyOn(FB, 'api').andCallFake(function(args, callback) {
                    callback(expected);
                });
                var result = null;
                facebook.api('/me').then(function(error) {
                    console.log(error);
                    result = error;
                });
                rootScope.$apply();
                expect(result).toBe(expected);
            });
        });
    });
});