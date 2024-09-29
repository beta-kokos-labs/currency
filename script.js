 const peer = new Peer();
let conn;

peer.on('open', (id) => {
    console.log('My peer ID is: ' + id);
    alert(`Your peer ID is: ${id} or go to this URL: https://kokos-labs.github.io/currency/test.html?id=${encodeURIComponent(id)}`);
});

peer.on('connection', (connection) => {
    conn = connection;
    conn.on('data', (data) => {
        document.getElementById('output').innerText = data;
    });
});

function connectPeer() {
    let peerId = getQueryParam('id')
    if(peerId === null){
    peerId = prompt('Enter peer ID:');}else{peerId = decodeURIComponent(peerId)}
    conn = peer.connect(peerId);
    conn.on('open', () => {
        console.log('Connected to: ' + peerId);
    });
    conn.on('data', (data) => {
        document.getElementById('output').innerText = data;
    });
}

function sendData() {
    const data = document.getElementById('dataInput').value;
    if (conn && conn.open) {
        conn.send(data);
    } else {
        alert('Not connected to any peer');
    }
}

function getQueryParam(param) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get(param)
}
