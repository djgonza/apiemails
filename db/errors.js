const { Schema, model } = require('mongoose');

var ErrorSchema = new Schema({
    fecha: Schema.Types.Date,
    descripcion: Schema.Types.String
});

const ErrorModel = model('Error', ErrorSchema);

module.exports = {
    ErrorModel
}