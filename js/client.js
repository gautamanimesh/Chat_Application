const socket = io('http://localhost:8000');

// GET DOM elements in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3'); // Audio!

// Function which will append eventInfo to the container.
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

// If the form gets submitted, send the server the message!
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

// const name = prompt("Enter your name to join");
// Ask new user for name and let the server know!
socket.emit('new-user-joined', name);

// If a new user joins, receive the event from the server!
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

// If server sends a mesage, receive it!
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container!
socket.on('left', name => {
    append(`${name} left the chat`, 'right')
})