'use strict';

let ContactsDB = require('../models/contacts_db');
let Joi = require('joi');
let IsEmpty = require('is-empty');
let ErrorUtil = require('../utils/error_util');

exports.addContact = async params => {
    if (!await _validateAddContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.addContact(params);
    data.contact_id = data._id;
    delete data._id;
    return {result: data};
}

exports.deleteContact = async params => {
    if (!await _validateDeleteContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.deleteContact(params);
    data.contact_id = data._id;
    delete data._id;
    return {result: data};
}

exports.queryAllContacts = async params => {
    let data = await ContactsDB.queryAllContacts();
    data.forEach(x => {
        x.contact_id = x._id;
        delete x._id;
    });
    return {result: data};
}

exports.updateContact = async params => {
    if (!await _validateUpdateContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.updateContact(params);
    data.contact_id = data._id;
    delete data._id;
    return {result: data};
}

async function _validateAddContactParams(params) {
    let schema = {
        phone: Joi.string().regex(/^[0-9]+$/, 'numbers').length(11).trim().required(),
        name: Joi.string().min(1).max(10).trim().required(),
        email: Joi.string().email().trim()
    }
    let options = {
        convert: false,
        allowUnknown: true
    };
    let result = await Joi.validate(params, schema, options);
    return IsEmpty(result.error);
}

async function _validateDeleteContactParams(params) {
    let schema = {
        contact_id: Joi.string().trim().required()
    };
    let options = {
        convert: false,
        allowUnknown: true
    };
    let result = await Joi.validate(params, schema, options);
    return IsEmpty(result.error);
}

async function _validateUpdateContactParams(params) {
    let schema = {
        contact_id: Joi.string().trim().required(),
        phone: Joi.string().regex(/^[0-9]+$/, 'numbers').length(11).trim().required(),
        name: Joi.string().min(1).max(10).trim().required(),
        email: Joi.string().email().trim()
    };
    let options = {
        convert: false,
        allowUnknown: true
    };
    let result = await Joi.validate(params, schema, options);
    return IsEmpty(result.error);
}