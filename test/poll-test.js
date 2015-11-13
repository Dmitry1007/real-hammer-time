const chai     = require("chai")
const assert   = chai.assert
const Poll     = require("../models/poll")


describe('Poll', function () {

  it("should have a title, question, and collection of responses", function () {
    var pollFromRequest = {
                            title: "Module 4 Sentiment",
                            question: "How do you feel about mod-4",
                            responses: [ "it sucks!",
                                         "it's ok.",
                                         "it's awesome!"
                                        ]
                          }

    var poll = new Poll(pollFromRequest)
    assert.equal(poll.title,    "Module 4 Sentiment")
    assert.equal(poll.question, "How do you feel about mod-4")
    assert.equal(poll.responses[0], "it sucks!")
  })
});
