//CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client) => {
    if(error){ return console.log('unable to connect to database');}
    
    const db = client.db(databaseName);

    // db.collection('users').findOne({name: 'Ashton'}, (error,user) => {
    //     if(error) return console.log('an error has occurred');
    //     console.log(user);
    // })

    // db.collection('users').find({age:28}).toArray((error, users) =>{
    //     if(error) return console.log('an error has occurred');
    // console.log(users);
    // })

    db.collection('tasks').findOne({_id: new ObjectID("5ebd31dafffe57347bdd0219")}, 
    (error, task) => {
            if(error) return console.log('a problem occurred');
            console.log(task);
    })

    // db.collection('tasks').find({completed:false}).toArray((error, tasks) => {
    //     if(error) return console.log('a problem occurred');
    //         console.log(tasks);
    // })

})