let socket;
let nickname;

function setNickname() {
    nickname = document.getElementById('nickname').value;
    if (nickname) {
        document.getElementById('nickname-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        initSocket();
        socket.emit('new user', nickname);
    } else {
        alert('Please enter a nickname');
    }
}

function initSocket() {
    socket = io();

    socket.on('chat history', (history) => {
        history.forEach((msg) => {
            displayMessage(msg);
        });
    });

    $('form').submit(() => {
        const message = $('#m').val();
        if (message) {
            const data = {
                nickname: nickname,
                text: message,
                time: new Date().toLocaleString(),
            };
            socket.emit('chat message', data);
            $('#m').val('');
        }
        return false;
    });

    socket.on('chat message', (msg) => {
        displayMessage(msg);
    });
}

function displayMessage(msg) {
    const table = document.getElementById('messages');
    const row = table.insertRow(-1);

    const cell1 = row.insertCell(0);
    cell1.className = 'message-container';
    cell1.innerHTML = `<div class="message-nickname">${msg.nickname}</div>`;

    const cell2 = row.insertCell(1);
    cell2.className = 'message-container';
    cell2.innerHTML = `<div class="message-text">${msg.text}</div>`;

    const cell3 = row.insertCell(2);
    cell3.className = 'message-container';
    cell3.innerHTML = `<div class="message-time">${msg.time}</div>`;
}

function sendMessage() {
    const message = $('#m').val();
    if (message) {
        const data = {
            nickname: nickname,
            text: `${message}`,
            time: new Date().toLocaleString(),
        };
        socket.emit('chat message', data);
        $('#m').val('');
    }
}