const {Schema, model} = require('mongoose')

const ArticleSchema = new Schema ({
    userId: {
        required: true,
        type: Schema.Types.ObjectId, //indica a mongoose que hay una relacion con cierto esquema
        ref: 'User' // aqui se le dice a mongoose cual es el esquema
    }, 
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
    dateAssigned: {
        type: Date,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
    },
    project: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    category: {
        type: String,
    }
});

ArticleSchema.method( 'toJSON', function() {
    const {__v, ...object} = this.toObject();
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