const input = document.querySelector('.inp');
const send_button = document.querySelector('.btn');
const location_button = document.querySelector('.location');
const dialog_window = document.querySelector('.dialog');

const url = 'wss://echo-ws-service.herokuapp.com/';
const websocket = new WebSocket(url);

function getGeoPosition() {
    if (!navigator.geolocation) {
        alert('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            let myGeo = `https://www.openstreetmap.org/search?query=${coords.latitude}%${coords.longitude}`;
            writeToScreen(myGeo, 'mySend');
            websocket.send(myGeo);
        });
    }
}

location_button.addEventListener('click', getGeoPosition);

function writeToScreen(message, person) {
    let pre = document.createElement('div');
    pre.style.padding = '5px';
    pre.style.borderStyle = 'solid';
    pre.style.borderColor = '#72B0BB';
    pre.style.borderRadius = '8px';
    if (person == 'mySend') {
        pre.style.marginLeft = 'auto';
        pre.style.background = '#CDF2A8';
    } else if (person == 'answer') {
        pre.style.marginRight = 'auto';
        pre.style.background = '#FBFCFC';
    }
    pre.innerHTML = message;
    dialog_window.appendChild(pre);
}

send_button.addEventListener('click', () => {
    websocket.onopen = function (evt) {
        writeToScreen('Собеседник найден', 'geo');
    };

    let message = document.querySelector('.inp').value;
    if (message != '') {
        writeToScreen(message, 'mySend');
        websocket.send(message);
    }
    websocket.onmessage = function (evt) {
        if (evt.data.includes('www.openstreetmap.org') == false) {
            writeToScreen(evt.data, 'answer');
        }
    };
    websocket.onerror = function (evt) {
        writeToScreen('Начните диалог заново', 'geo');
    };
});
