const express = require('express');

const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.json());
//app.use();
app.use(bodyparser.urlencoded({
    extended: true
}));
mongoose.set('use');
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
const db = "mongodb://localhost/TelecomApiDb";
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }).then(() => {
      console.log('connected to mongoDB database!');
    },
    error => {
      console.log('could not connect to mongoDB database:', error);
    }
  );


app.use('/user', require('./routers/user'));
app.use('/call', require('./routers/call'));
app.use('/text', require('./routers/text'));

const port = 3000;
const PORT  = process.env.port || 3500;

//const listener = app.listen(PORT);
//console.log(listener);
 const listener = app.listen(PORT, function(req, res){
    console.log('Listening on port ' + listener.address().port);
    //req.setHeader("Content-Type", "application/json");
   // res.setHeader('Content-Type', 'application/json'); 
  //res.send('server started!');
}); 
