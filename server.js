var express = require('express');

var app = express();


app.use(express.static('www'));
app.set('port', process.env.PORT || 7020);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});