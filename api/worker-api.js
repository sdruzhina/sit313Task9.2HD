var express  = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');
const WorkerTask = require('../models/WorkerTask');

// Get all tasks available to the worker
router.get('/worker/tasks', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } 
        if (!user.isWorker) {
            console.log('User is not a worker');
            res.status(403).send('User is not a worker');
        }
        else {
            // Get only tasks AVAILABLE to the authenticated user
            // Add the WorkerTask model to each record

            // Get all of the user's deleted tasks
            Task.aggregate([
                { $lookup: {
                    from: 'workertasks',
                    localField: '_id',
                    foreignField: 'task',
                    as: 'workerTask'
                }},
                { $unwind: {  
                    path: '$workerTask',
                    preserveNullAndEmptyArrays: true
                }},
                { $match: {
                    $and: [
                        {'workerTask.status': 'DELETED'}, 
                        {'workerTask.worker': mongoose.Types.ObjectId(user._id)}
                    ] 
                }}, 
                ], (err, deletedTasks) => {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        // Find all tasks and subtract the user's deleted tasks
                        Task.find({ status: 'AVAILABLE' }, (err, allTasks) => {
                            if (err) {
                                res.json(err);
                            }
                            else {
                                // Filter out deleted tasks
                                const taskList = allTasks.filter(
                                    a => !deletedTasks.map(d => d._id.toString()).includes(a._id.toString())
                                );
                                res.json(taskList);
                            }
                        })  
                    }
            });
        }
    })(req, res, next);
});

// Remove the task for the currently logged in worker
// Does not actually delete the task, only marks it as DELETED in WorkerTask record
// Creates a WorkerTask record if one does not exist
router.put('/worker/:workerId/workertasks/:taskId', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } 
        if (!user.isWorker) {
            console.log('User is not a worker');
            res.status(403).send('User is not a worker');
        }
        if (user._id != req.params.workerId) {
            console.log('Wrong user');
            res.status(403).send('Wrong user');
        }
        else {
            // Update the record if it exists, or create a new one
            WorkerTask.updateOne(
                { 
                    worker: user._id, 
                    task: req.params.taskId },
                { 
                    status: 'DELETED',
                    updatedAt: Date.now()
                },
                { upsert: true }, function(err, result) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({ 
                        status: 'success', 
                        message: 'WorkerTask successfully updated.' 
                    })
                }
            });
        }
    })(req, res, next);
});

module.exports = router;