
const mongoose = require('mongoose');
const express = require('express');



const Call = require('../models/call');


exports.getAllCalls = (req, res, next) => {
    // res.send('server started!');    
    Call.find().then(calls => {
        const response = {
            count: calls.length,
            CallList: calls.map(call => {
                return {
                    _id: call.id,

                    caller: call.caller,
                    callDate: call.callDate
                   
                }
            })
        }
            res.status(200).json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err,
                message: err.message
            });
        });
    };



exports.registerCall = (req, res, next) => {
    const call = new Call({
        _id: new  mongoose.Types.ObjectId,
        caller: req.body.caller,
        callDate: req.body.callDate
        
          }
  
    );
    call.save().then(result  => {
        console.log(result);
        res.status(200).send({
            message: 'user registration successfull',
            registeredCaller: {
                _id: result._id,
                caller: result.caller,
                callDate: result.callDate 
            },
            request: {
                type: 'POST',
                url: 'http://localhost:3500/routes/text/' + result._id
            }
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            error: err,
            msg: err.message
        })
    });
  };
  

  


exports.deleteCallRecord = function(req, res) {
    Call.deleteOne({caller: req.body.caller}, (err, callparam) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(callparam).end();
        }
    })
}

exports.updateCallRec = function(req, res) {
    User.updateMany({caller: req.body.caller, callDate: req.body.callDate}, (err, callparam) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(callparam).end();
        }
    })
}

// searching by id

        exports.getCallsById = (req, res, next) => {
            const callId = req.params.driverId;
             Call.findById(driverId)
                .select('_id caller callDate ')
                 .exec()
                .then(drvr => {
                   console.log('fetching calls from database', drvr);
                   if (drvr) {
                       res.status(200).json({
                            call: drvr
                           
                       });
                    } else {
                        res.status(404).json({
                           message: `No User found with this id ${driverId}`
                         });
                     }
                 })
                .catch(err => {
                     console.error(err);
                    res.status(500).json({
                        error: err
                    });
                });
                 };