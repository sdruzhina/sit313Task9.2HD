var express  = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Get all tasks created by the requester
router.get('/requester/tasks', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } 
        if (!user.isRequester) {
            console.log('User is not a requester');
            res.status(403).send('User is not a requester');
        }
        else {
            // Get tasks belonging to the authenticated user
            Task.find({ requesterId: user._id }, (err, taskList) => {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json(taskList);
                }
            });
        }
    })(req, res, next);
});

// Create a new task
router.post('/requester/tasks', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } 
        if (!user.isRequester) {
            console.log('User is not a requester');
            res.status(403).send('User is not a requester');
        }
        // Validate image task setup
        if (
            req.body.type === 'IMAGE' && !req.body.setup.filename
        ) {
            console.log('No image file uploaded');
            res.status(422).send({ errors: {message: 'No image file uploaded'}});
        }
        else {
            // Create a new task
            const task = new Task({ 
                requesterId: user._id,
                title: req.body.title,
                description: req.body.description,
                type: req.body.type,
                setup: req.body.setup,
                master: req.body.master,
                numberWorkers: req.body.numberWorkers,
                reward: req.body.reward,
                expiry: Date.parse(req.body.expiry),
                createdAt: Date.now()
            });
            task.save((err) => {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({ 
                        status: 'success', 
                        message: 'Task successfully added.' 
                    })
                }
            });
        }
    })(req, res, next);
});

router.post('/image-upload', (req, res) => {
    console.log(req.files);
    const image = req.files.myFile;

    // Create a unique filename using UUID
    const filename = uuidv4() + path.extname(image.name);
    const location = './public/uploads/' + filename;
    
    // Move the file to /uploads
    image.mv(location, (error) => {
        if (error) {
            console.error(error);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({ status: 'error', message: error }));
            return;
        }
    
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ status: 'success', path: '/uploads/' + filename }));
    })
  })

module.exports = router;
