const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})

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

//user
// const me = new User({
//    name: 'Ashton',
//    email: 'ASHTONRBAY@GMAIL.com',
//    age:32,
//    password: 'ashton123'
// })


// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error.message)
// })

//task
const Task = mongoose.model('Task', {
    description:{
        type: String,
        trim: true,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})

const todo = new Task({
    description: 'Study more',
    completed: true
})

todo.save().then(() => {
    console.log(todo)
}).catch((error) => {
    console.log(error)
})