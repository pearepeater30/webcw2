const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io()

//console log the username of the logged in user
console.log(user.email);

//Display Message in DOM
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight
});

chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const msg = username + ": " + e.target.elements.msg.value;

  console.log(msg);

  socket.emit('chatMessage', msg);

  e.target.elements.msg.value = '';
})

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p>${message}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}