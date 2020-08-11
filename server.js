const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
// const port = process.env.PORT || 5000;
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// // define a root route
// app.get('/', (req, res) => {
//   res.send("Hello World");
// });
// listen for requests
var mysql =require('mysql');
var pool =mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password: null,
    database:'node_js_crud'

});
app.listen(3001, () => {
  console.log(`Server is listening on port 3001`);
});


//Get request 
app.get('/api/get',(req,res)=>{
    pool.getConnection(function (err,connection){
        if(err){
            throw err;
        }
        console.log('connected');
        connection.query('SELECT * FROM student',function(error,result,fields){
            res.json(result);
            connection.release();

            if(error){
                throw error;
            }
        })
    })
});

//Post request
app.post('/api/post', function(req, res){
    console.log(req.body);
   var name = req.body.name;
   var messageId = req.body.messageId;
   var message = req.body.message;
   var id  = req.body.id;
     
   
   pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    connection.query(`INSERT INTO student (id, name, messageId, message) VALUES ('${id}', '${name}', '${messageId}', '${message}')`, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      
   console.log(error);
      // Handle error after the release.
      if (error) return error;
        res.send("success");
      // Don't use the connection here, it has been returned to the pool.
    });
})
});

//Delete request
app.delete('/api/delete', function(req, res){
    console.log(req.body);
   
   var id  = req.body.id;
     
   
   pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    connection.query(`DELETE FROM student WHERE id = '${id}'`, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      
   
      // Handle error after the release.
      if (error) return error;
        res.send("delete success");
      // Don't use the connection here, it has been returned to the pool.
    });
})
});

//Put request
app.put('/api/update', function(req, res){
    console.log(req.body);
//    let data = [req.body.name, req.body.id]
//    let sql = `UPDATE student name = ? WHERE id = ?`;
     
   
   pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    connection.query(`UPDATE student SET name = '${req.body.name}' WHERE id = '${req.body.id}'`, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      
        console.log(error);
      // Handle error after the release.
      if (error) return error;
        res.send("delete success");
      // Don't use the connection here, it has been returned to the pool.
    });
})
});
