
const mongoose = require('mongoose');
const express = require('express');



const Text = require('../models/text');


exports.getAllTexts = (req, res, next) => {
    // res.send('server started!');    
    Text.find().then(texts => {
        const response = {
            count: texts.length,
            TextList: texts.map(text => {
                return {
                    _id: text.id,

                    sender: text.sender,
                    receiver: text.receiver,
                    Message: text.Message  
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



exports.registerText = (req, res, next) => {
    const text = new Text({
        _id: new  mongoose.Types.ObjectId,
        sender: req.body.sender,
        receiver: req.body.receiver,
        Message: req.body.Message
        
          }
  
    );
    text.save().then(result  => {
        console.log(result);
        res.status(200).send({
            message: 'text registration successfull',
            registeredText: {
                _id: result._id,
                sender: result.sender,
                receiver: result.receiver ,
                Message: result.Message ,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3500/routes/text/' + result._id
                }
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
  

  


exports.deleteTexts = function(req, res) {
    Text.deleteOne({sender: req.body.sender}, (err, sent) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(sent).end();
        }
    })
}

exports.updateTextRecs = function(req, res) {
    Text.updateMany({sender: req.body.sender, receiver: req.body.receiver, Message: req.body.Message}, (err, texts) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(texts).end();
        }
    })
}

// searching by id

        exports.getTextsById = (req, res, next) => {
            const TextId = req.params.driverId;
             Call.findById(driverId)
                .select('_id sender receiver Message ')
                 .exec()
                .then(drvr => {
                   console.log('fetching texts from database', drvr);
                   if (drvr) {
                       res.status(200).json({
                            text: drvr
                           
                       });
                    } else {
                        res.status(404).json({
                           message: `No text found with this id ${driverId}`
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