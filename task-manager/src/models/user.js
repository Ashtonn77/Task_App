const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isLength(value,{min:7,max:undefined})){
                throw new Error('Password cannot be less than seven characters')
            }
            else if(validator.contains(value.toLowerCase(), 'password')){
                throw new Error('Your password cannot have the word password in it')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('You can\'t age backwards...you\'re not Benjamin Button')
            }
        }
    }
})

module.exports = User