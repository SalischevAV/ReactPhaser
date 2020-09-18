const {Schema, model} = require ('mongoose');

const GameUserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 12
    },
    avatar: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    highScore:{
        type: Number,
        default: 0
    }

}, {versionKey: false});

module.exports = model('GameUser', GameUserSchema);