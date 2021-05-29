const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');


const socket = io()

// Get username and room from URL
const { room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const nameOfUser = user.forename + " " + user.surname;

//Set Name of Page Upon Loading
roomName.innerText = room;

//Emit Name Of User and the Room the User Connected To
socket.emit('joinRoom', {nameOfUser, room});

//Display Message in DOM
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight
});

//Add a Event Listner which retrieves the values 
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const msg = user.forename + " " + user.surname + ": " + e.target.elements.msg.value;

  console.log(msg);

  socket.emit('chatMessage', msg, room);

  e.target.elements.msg.value = '';
})

//Display Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p>${message}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}