//CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client) => {
    if(error){ return console.log('unable to connect to database');}
    
    const db = client.db(databaseName);

//    db.collection('users').updateOne({
//         _id : new ObjectID('5ec03753a6cfae2687292259')
//     },{
//         $inc:{
//             age:2
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

db.collection('tasks').updateMany({
    completed:false
},{
    $set:{
        completed:true
    }
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

})