const config = require('../config');
const Agenda = require('agenda');
const watson = require('../api/watson');

const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URI || config.mongoDB.uri, 
        collection: 'agenda'
    },
    processEvery: '30 seconds'
});

agenda.define('process image', {priority: 'high', concurrency: 10}, async job => {
    const {fileName} = job.attrs.data.fileName;
    const {taskId} = job.attrs.data.taskId;
    // Run Watson 
    await watson.classify('http://sit313task92hd.herokuapp.com' + fileName, taskId);
});

module.exports = agenda;