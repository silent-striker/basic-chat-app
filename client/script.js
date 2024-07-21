const socket = io('http://localhost:3000');
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const userName = prompt("what is your name?");
appendMessage('You joined');

socket.emit('new-user', userName);

socket.on('chat-message', data => {
    const { message, userName } = data;
    appendMessage(`${userName}: ${message}`);
});

socket.on('user-connected', userName => {
    appendMessage(`${userName} joined`);
});

socket.on('user-disconnected', userName => {
    appendMessage(`${userName} disconnected`);
});

messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}