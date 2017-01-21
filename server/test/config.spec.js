require('should');
describe('config', function() {
	it('get Config', function() {
	const config = require('../config');
		config.GITHUB_CLIENT_ID.should.be.exactly('2eb28056e37758b0ba34');
		config.GITHUB_CLIENT_SECRET.should.be.exactly('ce0031a2155373dd4f9db9366812ab8d019bfced');
    config.GITHUB_ORGANISATION.should.be.exactly('ziggurate-v2');
    config.MONGO_URL.should.be.exactly('mongodb://localhost/ziggurate');
    });
});
