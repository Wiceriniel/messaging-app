var person = localStorage.getItem("name");
function getName() {
    person = prompt("Enter your name", person);
    localStorage.setItem("name", person);
    document.getElementById("showName").innerText = person;
    if (person == null || person == "" || person == " ") {
        getName();
    }
}

const socket = io();

function clicked() {
    send();
    document.getElementById("textarea").focus();
}

function send() {
    person = person.replace(/"/g, "&#34;");
    var y = document.getElementById('textarea').value.replace(/"/g, "&#34;");
    socket.emit('buttonpress', '{"person": "' + person + '", "message": "' + y + '"}');
    document.getElementById("textarea").value = "";
}

socket.on('emitmsg', (msg) => {

    var x = document.getElementsByTagName("HTML")[0];

    var servernameandmsg = JSON.parse(msg);
    $("#msglist").append(`<li class="names">${servernameandmsg.serverperson}</li><li class="messages">${servernameandmsg.servermessage}</li>`);

    x.scrollTop = x.scrollHeight - x.clientHeight;

});

function enterkey(event) {
    if (event.keyCode === 13) {
        send();
        event.preventDefault();
    }
}