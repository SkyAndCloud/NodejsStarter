'use strict';

let chai = require('chai');
let expect = require('chai').expect;
const debug = require('debug')('TEST');
let config = require('config');

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));

let addContactsJsonSchema = {
    title: 'Add Contacts Response JSON Schema',
    type: 'object',
    required: ['result'],
    properties: {
        result: {
            type: 'object',
            required: ['contact_id', 'phone', 'name'],
            properties: {
                contact_id: {type: 'string'},
                phone: {type: 'string'},
                name: {type: 'string'},
            }
        }
    }
};
let queryContactsJsonSchema = {
    title: 'Query Contacts Response JSON Schema',
    type: 'object',
    required: ['result'],
    properties: {
        result: {type: 'array'}
    }
}
let contact;

describe('Contacts API', () => {
    it('Add Contact', done => {
        let testBody = {
            phone: '18827054819',
            name: 'yshan',
            email: 'email@email.com'
        };
        chai.request(config.BaseUrl)
            .post('/contacts')
            .send(testBody)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(addContactsJsonSchema);
                    contact = res.body.result;
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });

    it('Query All Contacts', done => {
        chai.request(config.BaseUrl)
            .get('/contacts')
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(queryContactsJsonSchema);
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });

    it('Update Contact', done => {
        chai.request(config.BaseUrl)
            .put(`/contacts/${contact.contact_id}`)
            .send({
                phone: '18827054819',
                name: 'sine'
            })
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(addContactsJsonSchema);
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });

    it('Delete Contact', done => {
        chai.request(config.BaseUrl)
            .del(`/contacts/${contact.contact_id}`)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(addContactsJsonSchema);
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });
});
