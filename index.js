const mongoose = require('mongoose');
const moment = require('moment');
const express = require('express');

const { ErrorModel } = require('./db/errors');
const models = require('./db/models');

const app = express();

app.use(express.json());

Object.keys(models).forEach((model) => {

    let name = model.replace('Model', '').toLowerCase();

    app.get('/' + name, async (req, res, next) => {

        console.log('GET => ', name);

        try {

            const data = req.body;
            const result = await models[model].find(data);
            res.send(JSON.stringify(result));

        } catch (error) {
            next(error)
        }

    })

    app.post('/' + name, async (req, res, next) => {

        console.log('POST => ', name);

        try {

            const data = req.body;
            const result = await models[model].create(data);
            res.send(JSON.stringify(result));

        } catch (error) {
            next(error);
        }

    });

    app.put('/' + name, async (req, res, next) => {

        console.log('PUT => ', name);

        try {

            const data = req.body;
            var document = await models[model].findOne({ _id: data._id });
            Object.assign(document, data);
            const result = await document.save();
            res.send(JSON.stringify(result));

        } catch (error) {
            next(error);
        }

    });

    app.delete('/' + name, async (req, res, next) => {

        console.log('DELETE => ', name);

        try {

            const data = req.body;
            var result = await models[model].deleteOne({ _id: data._id });
            res.send(JSON.stringify(result));

        } catch (error) {
            next(error);
        }

    });

})

/* Capturador de Errores */
app.use((err, req, res, next) => {
    console.log('Catch Error => ', err);
    ErrorModel.create({
        fecha: moment().format(),
        descripcion: err
    });
    res.status(500);
    res.send({ error: err });
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at ${process.env.PORT}`);

    console.log('Ends Points: ');
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            console.log(' => ', r.route.path, r.route.methods)
        }
    })

    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
})