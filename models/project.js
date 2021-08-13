const mongoose = require('mongoose');
const Joi      = require('joi');


const projectSchema = new mongoose.Schema({
    name    : String,
    summary   : String,
    description : String,
    createdAt: { type:Date, default:Date.now},
});
const projectModal = mongoose.model('projects', projectSchema)

function projectModalValidate(modal) {
    const schema = {
        name    : Joi.string().required(),
        summary   : Joi.string().required(),
        description : Joi.string().required(),
    };

    return Joi.validate(modal, schema);
  }

module.exports.Project   = projectModal;
module.exports.validate = projectModalValidate;