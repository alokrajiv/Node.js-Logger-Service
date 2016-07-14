var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    fs = require('fs');
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/data/', function (req, res) {
    var filename = "test.txt";
    var dataToSave = JSON.stringify(req.body);
    console.log(dataToSave);
    fs.unlink(filename, function (err) {
        if (err && err.code !== 'ENOENT')
            throw err;
        fs.writeFile(filename, dataToSave, { flag: 'w' }, function (err) {
            if (err) throw err;
            res.json({ data: "saved" });
        });
    });
});
app.listen(process.env.PORT || 9001, function(){
    console.log("Server running..");
});