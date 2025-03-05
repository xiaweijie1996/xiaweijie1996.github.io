document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully!");
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function sendMessage() {
    let inputField = document.getElementById("chat-text");
    let message = inputField.value.trim();
    if (!message) return;

    displayMessage("You: " + message, "user");

    // Directly call the OpenAI API
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}` // Replace with your actual API key
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // or another model of your choice
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message }
            ]
        })
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
