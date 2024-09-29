function* codeGenerator() {
    const characters = 'qwertyuiopasdfghjklzxcvbnm-0123456789';
    while (true) {
        let code = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        yield code;
    }
}

// Usage
const generateCode = codeGenerator();
console.log(generateCode.next().value);
const ids = generateCode.next().value
const code = 'koko-currency-id-'+ids
const peer = new Peer(code);
let conn;

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    document.getElementById('inputField').value=id
    alert('Your peer ID is: ' + id);
});

peer.on('connection', (connection) => {
    conn = connection;
    conn.on('data', (data) => {
        if(data == 'everything-good?'){sendData()}
        document.getElementById('output').innerText = data;
    });
});

function connectPeer() {
    const peerId = prompt('Enter peer ID:');
    conn = peer.connect(peerId);
    conn.on('open', () => {
        console.log('Connected to: ' + peerId);
    });
    conn.on('data', (data) => {
        document.getElementById('output').innerText = data;
    });
}

function sendData() {
    const data = prompt('how much do you wanna give?');
    if(data > document.cookie){document.cookie = document.cookie - data
    if (conn && conn.open) {
        conn.send(data);
    } else {
        alert('Not connected to any peer');
    }
}}
