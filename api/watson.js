const config = require('../config');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports = {
    // Classify an image with IBM Watson
    classify(imageUrl) {
        const visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        authenticator: new IamAuthenticator({
            apikey: process.env.IBM_API_KEY || config.ibm.api_key
        }),
        url: process.env.IBM_URL || config.ibm.url,
        });

        const classifyParams = {
        url: imageUrl,
        };

        visualRecognition.classify(classifyParams)
        .then(response => {
            const classifiedImages = response.result;
            console.log(JSON.stringify(classifiedImages, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
    }
}
