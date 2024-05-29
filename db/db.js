// db 

const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://DmtrPpl:4606112004@cluster0.sqeyw1l.mongodb.net/').on(
    'open', () => {
        console.log('Connected to the database');
    }
).on('error', (error) => {
    console.log(`Error connecting to the database: ${error}`);
});

module.exports = connection;