let winston = require('winston');

winston.loggers.add('ContactsLogger', {
    console: {
        colorize: 'true',
        label: 'ContactsLogger'
    },
    file: {
        colorize: 'true',
        filename: './logs/contacts.log',
        maxsize: 5242880,
        maxFiles: 20
    }
});