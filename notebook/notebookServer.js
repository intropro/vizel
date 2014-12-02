var express = require('express');
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
}

app.options('*', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());



app.post('/query', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// we now can assume the api key is valid,
// and simply expose the data

app.post('/query', function(req, res, next){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1234'
    });

    connection.connect();

    console.log('REQUEST body.query:', req.body.query);

    try{
        connection.query(req.body.query, function(err, rows, fields) {
            if (err) {
                console.log('Err: ', err);
                res.send({
                    data: [err],
                    error: err,
                    data2: [err],
                    error2: err
                });
                return;
            }

//            console.log('The response is: ', rows, fields);
            console.log('Success: return ' + rows.length + ' rows.', fields);
            res.send({
                data2: rows,
                data: rows
            });
        });

    } catch(e){

    } finally{
        connection.end();
    }
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
    // whatever you want here, feel free to populate
    // properties on `err` to treat it differently in here.
    res.status(err.status || 500);
    res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
    res.status(404);
    res.send({ error: "Lame, can't find that" });
});

/* istanbul ignore next */
if (!module.parent) {
    var port = 9090;
    app.listen(port);
    console.log('Express started on port ' + port);
}
