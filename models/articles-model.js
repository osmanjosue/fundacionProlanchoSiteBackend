const {Schema, model} = require('mongoose')

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true,
    }, 
    content: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    dateCreated: {
        type: Date,
        required: true,
    },
    category: {
        type: String,
    }
});

module.exports = model( 'Article', ArticleSchema);

/* The permitted SchemaTypes are:

String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
UUID */