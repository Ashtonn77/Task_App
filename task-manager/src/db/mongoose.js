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


const me = new User({
   name: 'Ashton    ',
   email: 'ASHTONRBAY@GMAIL.com   '
})


me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log(error.message)
})

// const Task = mongoose.model('Task', {
//     description:{
//         type: String
//     },
//     completed:{
//         type: Boolean
//     }
// })

// const todo = new Task({
//     description: 'Study more',
//     completed: true
// })

// todo.save().then(() => {
//     console.log(todo)
// }).catch((error) => {
//     console.log(error)
// })