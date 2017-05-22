
const ottoman = require('ottoman'),
    bucket = require('./app').bucket;
const couchbase = require('couchbase');


ottoman.store = new ottoman.CbStoreAdapter(bucket, couchbase);

//modelo de persona
var personModel = ottoman.model("Person", {
    name: {
        first: "string",
        last: "string"
    },
    email: "string",
    comments: [
        {
            ref: "Comment"
        }
    ],
    timestamp: {
        type: "Date",
        default: function () { return new Date() }
    }
},{
    index:{
        findByEmail:{
            by:"email"
        }
    }
});

//modelado de comentario
var commentModel = ottoman.model("Comment", {
    timestamp: {
        type: "Date",
        default: function () { return new Date() }
    },
    message: "string"
});

module.exports.personModel= personModel;
module.exports.commentModel= commentModel;