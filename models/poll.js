const crypto = require('crypto');

function Poll(pollFromRequest) {
  this.title     = pollFromRequest.title
  this.question  = pollFromRequest.question
  this.responses = pollFromRequest.responses
  this.id        = crypto.randomBytes(10).toString("hex")
  this.voterId   = crypto.randomBytes(10).toString("hex")
  this.voterUrl  = "/vote/" + this.voterId;
}

module.exports = Poll
