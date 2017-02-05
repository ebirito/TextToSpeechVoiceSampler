const express = require('express');
const app = express();
const path = require('path');
const synthesize = require('./synthesize');

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/synthesize', function(request, response) {
  const options = {
      vendor: request.query.vendor,
      fileName: request.query.fileName,
      text: request.query.text
  }

  synthesize.synthesize(options, function(extension) {
      response.json({success : "Synthezised Successfully", status : 200, extension: extension});
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});