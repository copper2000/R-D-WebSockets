// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
const WHITE_SPACE = ' ';

// Emit events

button.addEventListener('click', () => {
    
    if (handle.value != '') {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value,
        });
        message.value = null;
    }
    else {
        alert('Name cannot be null!');
    }

});

// Typing... events
message.addEventListener('keypress', () => {    
    socket.emit('typing', handle.value);
});


// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = null;
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + WHITE_SPACE + 'is typing message...</em></p>';
});
