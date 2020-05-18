const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name:{
        type: String
    },
    age:{
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description:{
        type: String
    },
    completed:{
        type: Boolean
    }
})

const me = new User({
    name:'Ashton',
    age: 'Mikes'
})

const todo = new Task({
    description: 'Study more',
    completed: true
})

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

todo.save().then(() => {
    console.log(todo)
}).catch((error) => {
    console.log(error)
})