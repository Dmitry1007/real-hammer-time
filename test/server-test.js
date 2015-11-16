const assert   = require('assert');
const app      = require('../server');
const request  = require('request');
const fixtures = require('./fixtures');
const Poll     = require("../lib/poll")

describe('Server', () => {
  before((done) => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with a poll title', (done) => {
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(title),
               `"${response.body}" does not include "${title}".`);
        done();
      });
    });
  });

  describe('POST /poll/new', () => {
    beforeEach(() => {
      app.polls = {};
    });

    it('should not return 404', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/poll/new', { form: payload }, (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should receive and store data', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/poll/new', { form: payload }, (error, response) => {
        if (error) { done(error); }

        var pollCount = Object.keys(app.polls).length;

        assert.equal(pollCount, 1, `Expected 1 polls, found ${pollCount}`);

        done();
      });
    });
  });

  describe('GET /poll/:id', () => {
    beforeEach(() => {
      var pollFromRequest = {
                              title: "Module 4 Sentiment",
                              question: "How do you feel about mod-4",
                              responses: [ "it sucks!",
                                           "it's ok.",
                                           "it's awesome!"
                                          ]
                            }

      this.poll = new Poll(pollFromRequest)

      app.polls.testPoll = this.poll
    });

    it('should not return 404', (done) => {
      this.request.get('/poll/testPoll', (error, response) => {
        if (error) { done(error)}
        assert.notEqual(response.statusCode, 404)
        done()
      });
    });

    it('should return a page that has the title of the poll', (done) => {
      this.request.get('/poll/testPoll', (error, response) => {
        if (error) { done(error); }

        assert(response.body.includes(this.poll.title),
               `"${response.body}" does not include "${this.poll.title}".`);
        done();
      });
    });
  });

});
