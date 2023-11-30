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

ArticleSchema.method( 'toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.idArticle = _id;
    return object;
})

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