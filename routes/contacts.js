'use strict';

let express = require('express');
let router = express.Router();
let ContactsLogger = require('winston').loggers.get('ContactsLogger');
let ContactsController = require('../controllers/contacts_controller');

router.post('/', async (req, res, next) => {
    let params = {
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email,
    };
    try {
        let result = await ContactsController.addContact(params);
        ContactsLogger.info(`add contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`add contact error => ${err.stack}`);
        next(err);
    }
});

router.delete('/:contact_id', async (req, res, next) => {
    let params = {
        contact_id: req.params.contact_id
    };
    try {
        let result = await ContactsController.deleteContact(params);
        ContactsLogger.info(`delete contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`delete contact error => ${err.stack}`);
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let result = await ContactsController.queryAllContacts();
        ContactsLogger.info(`query all contacts result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`qeury all contacts error => ${err.stack}`);
        next(err);
    }
});

router.put('/:contact_id', async (req, res, next) => {
    let params = {
        contact_id: req.params.contact_id,
        phone: req.body.phone,
        name: req.body.name,
        email: req.body.email
    };
    try {
        let result = await ContactsController.updateContact(params);
        ContactsLogger.info(`update contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`update contact error => ${err.stack}`);
        next(err);
    }
});

module.exports = router;