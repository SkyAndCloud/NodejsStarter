'use strict';

let ConfigSet = require('../configs/config_set.json');
let ErrorSet = require('../utils/error_util');
let Joi = require('joi');
let ContactsLogger = require('winston').loggers.get('ContactsLogger');
let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;
let IsEmpty = require('is-empty');

let db;
MongoClient.connect(ConfigSet.DATABASE_URL, (err, client) => {
    if (err) {
        ContactsLogger.error(`database error => ${err.stack}`);
        throw err;
    } else {
        db = client.db(ConfigSet.DATABASE_NAME);
    }
})

exports.addContact = async function(params) {
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    let data = await collection.insert(params);
    return data.ops[0];
}

exports.deleteContact = async function(params) {
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    let data = await collection.findOneAndDelete({_id: new MongoDB.ObjectID(params.contact_id)});
    return data.value;
}

exports.queryAllContacts = async function(params) {
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    return await collection.find({}).toArray();
}

exports.updateContact = async function(params) {
    let collection = db.collection(ConfigSet.COLLECTION_NAME);
    let contact_id = params.contact_id;
    delete params.contact_id;
    let data = await collection.findOneAndUpdate({_id: new MongoDB.ObjectID(contact_id)}, params, {returnOriginal: false});
    return data.value;
}