const express = require('express');
const config = require ('config');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
const PORT =config.get('serverPort');
const mainRouter = require('./routes/main');
const secureRouter = require('./routes/secure');


const app = express();

app.use(cors);
app.use(express.json());

app.use('/', mainRouter);
app.use('/', secureRouter);

app.use((req, res, next)=>{
    res.status(404).json({message: '404 - Notfound'});
});

app.use((err, req, res, next)=>{
    res.status(err.status || 500).json({error: err});
});

async function start(){
    try{
        await mongoose.connect(config.get('dbUrl'),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },()=>{
            console.log('Mongoose connect to db: '+ config.get('dbName'));
        });
        app.listen(PORT, ()=>{
            console.log('Server running at port ', PORT)
        })
    }catch(err){
        console.log('Start server error', err);
    }
}
start();