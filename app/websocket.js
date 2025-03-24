const ws = new WebSocket("ws://localhost:3001");

ws.onopen = () => {
    console.log("Connected to server");
};

ws.onmessage = (event) => {
    document.getElementById("output").innerText = "Server says: " + event.data;
    console.log("Received from server:", event.data);
};

ws.onclose = () => {
    console.log("Connection closed");
};

function sendMessage() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send("Hello Server!");
    }
}
