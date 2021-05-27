const chatForm = document.getElementById('chat-form');

const socket = io()

console.log(username);

socket.on('message', message => {
  console.log(message);
});

chatForm