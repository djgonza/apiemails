const { model } = require('mongoose');
const schemas = require('./schema');
var models = {}

Object.keys(schemas).forEach((schema) => {
    let name = schema.replace('Schema', '');
    models[name + 'Model'] = model(name, schemas[schema]);
});

module.exports = { ...models };