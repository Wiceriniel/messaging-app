var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('static'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', (socket) => {
    socket.on('buttonpress', (msg) => {
        nameandmsg = JSON.parse(msg);
        
        if (nameandmsg.message !== " " & nameandmsg.message !== "" & nameandmsg.person !== "" & nameandmsg.person !== " ") {
            nameandmsg.message = nameandmsg.message.replace(/</g, "&lt;");
            nameandmsg.message = nameandmsg.message.replace(/>/g, "&gt;");
            nameandmsg.person = nameandmsg.person.replace(/</g, "&lt;");
            nameandmsg.person = nameandmsg.person.replace(/>/g, "&gt;");

            io.emit("emitmsg", '{"serverperson": "' + nameandmsg.person + '", "servermessage": "' + nameandmsg.message + '"}');
        }
        
    });
  });

http.listen(3000, () => {
  console.log('http://localhost:3000');
});