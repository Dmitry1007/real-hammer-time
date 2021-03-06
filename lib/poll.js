const crypto = require("crypto")
const _          = require("lodash")

function Poll(pollFromRequest) {
  this.title             = pollFromRequest.title
  this.question          = pollFromRequest.question
  this.responses         = pollFromRequest.responses
  this.responsesAndVotes = _.reduce(pollFromRequest.responses, function(result, key) {
                             result[key] = 0
                             return result
                           }, {})
  this.id                = crypto.randomBytes(10).toString("hex")
  this.voterId           = crypto.randomBytes(10).toString("hex")
  this.voterUrl          = "/vote/" + this.voterId
  this.open              = true
}

module.exports = Poll
