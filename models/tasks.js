const mongoose = require('mongoose');
const Joi      = require('joi');


const taskSchema = new mongoose.Schema({
    name    : String,
    description: String,
    label   : Array,
    project: {type: String , ref : "projects"},
    createdAt: { type:Date, default:Date.now},
});
const taskModal = mongoose.model('tasks', taskSchema)

function taskModalValidate(modal) {
    const schema = {
        name    : Joi.string().required(),
        description: Joi.string().required(),
        label: Joi.array(),
        project: Joi.string().required()
    };
  
    return Joi.validate(modal, schema);
  }
  
module.exports.Task   = taskModal;
module.exports.validate = taskModalValidate;