const winston=require('winston');

let ContactsLogger=new winston.Logger({
    level: "verbose",
    transports:[
        new (winston.transports.File)({
            filename:'logs/contacts.log'
        }),
        new (winston.transports.Console)()
    ]
})

module.exports.logger=ContactsLogger;