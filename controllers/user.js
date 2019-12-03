
const mongoose = require('mongoose');
const express = require('express');



const User = require('../models/user');


exports.getAllUsers = (req, res, next) => {
    // res.send('server started!');    
    User.find().then(users => {
        const response = {
            count: users.length,
            usersList: users.map(usr => {
                return {
                    _id: usr.id,

                    Name: usr.Name,
                    PhoneNumber: usr.PhoneNumber,
                    password: usr.password
                   
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



exports.registerUser = (req, res, next) => {
    const user = new User({
        _id: new  mongoose.Types.ObjectId,
        Name: req.body.Name,
        PhoneNumber: req.body.PhoneNumber,
        password : req.body.password
          }
  
    );
    user.save().then(result  => {
        console.log(result);
        res.status(200).send({
            message: 'user registration successfull',
            registeredUser: {
                _id: result._id,
                Name: result.Name,
                PhoneNumber: result.PhoneNumber,
                password: result.password  
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
  

  


exports.deleteMember = function(req, res) {
    User.deleteOne({Name: req.body.Name}, (err, member) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(member).end();
        }
    })
}

exports.updateMember = function(req, res) {
    User.updateMany({Name: req.body.Name, PhoneNumber: req.body.PhoneNumber, password: req.body.password}, (err, member) => {
        if(err) {
            res.status(400).end(err.message);
        } else {
            res.send(member).end();
        }
    })
}

// searching by id

        exports.getUserById = (req, res, next) => {
            const userId = req.params.driverId;
             User.findById(driverId)
                .select('_id Name PhoneNumber password')
                 .exec()
                .then(drvr => {
                   console.log('fetching user from database', drvr);
                   if (drvr) {
                       res.status(200).json({
                            user: drvr
                           
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