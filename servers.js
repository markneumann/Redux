// servers.js for Quoting Dojo Redux
//
// Require the Express Module
var express = require("express");
// Create an Express App
var app = express();
// // Require body-parser (to receive post data from clients)
var bodyParser = require("body-parser");
// // Integrate body-parser with our App
app.use(bodyParser.urlencoded());
// Require path
var path = require("path");
// Require Mongoose
var mongoose = require('mongoose');
// Setting our Static Folder Directory
app.use(express.static(__dirname + "./static"));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/Redux');
//Create Schema
var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String, },
    { timestamps: {
        createdAt: 'when'
    }
});
mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quote'); // We are retrieving this Schema from our Models, named 'User'

// Routes
// Root Request
app.get('/', function(req, res) {
    res.render('redux', {title: "Quoting Dojo Redux"});
    console.log("log =" + req);
});
app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quotes) {
        if(err){
            console.log(err);
        } else {
            console.log(quotes);
            res.render("quotes", {quotes: quotes});
        }
    });
});
// Add Quote Post
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var quote = new Quote({
        name: req.body.name,
        quote: req.body.quote,
        when: req.body.when
    });
    console.log(quote);
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quote.save(function(err) {
        // if there is an error console.log that something went wrong!
        if (err) {
            console.log('something went wrong');
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a quote!');
            res.redirect('/quotes');
        }
    });
});
// Setting our Server to Listen on Port: 8001
app.listen(8001, function() {
    console.log("listening on port 8001 - Redux");
});
