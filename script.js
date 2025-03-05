document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully!");
});

async function sendMessage() {
    let inputField = document.getElementById("chat-text");
    let message = inputField.value.trim();
    if (!message) return;

    displayMessage("You: " + message, "user");

    let response = await fetch("http://your-backend-domain.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    });

    let result = await response.json();

    if (result.error) {
        displayMessage("Error: " + result.error, "bot");
        return;
    }

    displayMessage("AI: " + result.reply, "bot");
    inputField.value = "";
}

function toggleChat() {
    const chatWindow = document.getElementById("chat-window");
    if (!chatWindow) {
        console.error("No element with id 'chat-window' found.");
        return;
    }
    // Toggle the display property between 'none' and 'flex'
    chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "flex" : "none";
    console.log("Chat window display set to:", chatWindow.style.display);
}

function displayMessage(message, sender) {
    const chatBody = document.getElementById("chat-body");
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.className = sender; // you can use different styles for 'user' and 'bot'
    chatBody.appendChild(messageElement);
    // Auto-scroll to the latest message
    chatBody.scrollTop = chatBody.scrollHeight;
}
