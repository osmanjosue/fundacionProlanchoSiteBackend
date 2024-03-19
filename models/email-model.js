const { Schema, model } = require('mongoose');

const EmailSchema = new Schema({
    from: {
        required: true,
        type: String,
    },
    to: {
        required: true,
        type: String,
    },
    subject: {
        required: true,
        type: String,
    },
    html: {
        required: true,
        type: String,
    }

});

EmailSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model( 'Email', EmailSchema);