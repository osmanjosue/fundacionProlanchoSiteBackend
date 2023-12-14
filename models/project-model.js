const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    img: {
        type: String,
    },
    published: {
        type: Boolean,
        required: true,
        default: true,
    }
});

ProjectSchema.method('toJSON', function () {

    const { __v, ...Object } = this.toObject();
    return Object;

});

module.exports = model('Project', ProjectSchema);