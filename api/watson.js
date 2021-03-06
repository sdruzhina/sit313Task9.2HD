const config = require('../config');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const Task = require('../models/Task');

module.exports = {
    // Classify an image with IBM Watson
    async classify(imageUrl, taskId) {
        const visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        authenticator: new IamAuthenticator({
            apikey: process.env.IBM_API_KEY || config.ibm.api_key
        }),
        url: process.env.IBM_URL || config.ibm.url,
        });

        const classifyParams = {
            url: imageUrl,
            threshold: 0.6,
        };

        // Set the task status to 'PROCESSING'
        await Task.updateOne(
            { _id: taskId },
            { 
                status: 'PROCESSING',
                updatedAt: Date.now()
            },
            { upsert: false }, function(err, result) {
            if (err) {
                console.log(err);
            }
        });
        
        // Run the classification API request
        visualRecognition.classify(classifyParams)
        .then(response => {
            const classifiedImages = response.result;
            console.log(JSON.stringify(classifiedImages, null, 2));

            // Update the task in DB if successful
            Task.updateOne(
                { _id: taskId },
                { 
                    status: 'COMPLETED',
                    response: response,
                    updatedAt: Date.now()
                },
                { upsert: false }, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
        })
        .catch(err => {
            console.log('error:', err);

            // Update the task in DB if failed
            Task.updateOne(
                { _id: taskId },
                { 
                    status: 'FAILED',
                    response: err,
                    updatedAt: Date.now()
                },
                { upsert: false }, function(err, result) {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
}
