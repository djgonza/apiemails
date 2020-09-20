const { Schema, models } = require('mongoose');

const ProyectoSchema = new Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    }
})

const UsuarioSchema = new Schema({
    proyecto: {
        type: Schema.Types.ObjectId,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    emailValidate: {
        type: Schema.Types.Boolean,
        default: false
    }
}).pre('validate', { document: true, query: true }, (doc, next, more, other) => {

    console.log(this, this);

    next(new Error('asdas'));

    /*models['Usuario'].find({ email: this.email },  (err, docs) => {
        if (!docs.length) {
            next();
        } else {
            next(new Error(`El email ${this.email} ya existe`));
        }
    });*/

});

const HitSchema = new Schema({
    email: {
        type: Schema.Types.ObjectId,
        required: true
    },
    hit: {
        type: Schema.Types.String,
        required: true
    }
});

const EmailSchema = new Schema({
    proyecto: {
        type: Schema.Types.ObjectId,
        required: true
    },
    subject: {
        type: Schema.Types.String,
        required: true
    },
    text: {
        type: Schema.Types.String,
        required: true
    },
    html: {
        type: Schema.Types.String,
        required: true
    }
});

module.exports = {
    ProyectoSchema,
    UsuarioSchema,
    HitSchema,
    EmailSchema
}
