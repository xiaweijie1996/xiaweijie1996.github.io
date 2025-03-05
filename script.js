document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully!");
});

// let apiKey = "";

// // Load API Key from `config.json`
// fetch("config.json")
//     .then(response => response.json())
//     .then(data => {
//         apiKey = data.Key;
//     })
//     .catch(error => console.error("Error loading API key:", error));
// // print the apiKey
// console.log(apiKey);

// // Toggle Chat Window
// function toggleChat() {
//     let chatWindow = document.getElementById("chat-window");
//     chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "flex" : "none";
// }

// // Send Message to OpenAI API
// async function sendMessage() {
//     let inputField = document.getElementById("chat-text");
//     let message = inputField.value.trim();
//     if (!message) return;

//     // Display user message
//     displayMessage("You: " + message, "user");

//     if (!apiKey) {
//         displayMessage("Error: API key is missing!", "bot");
//         return;
//     }

//     // Call ChatGPT API
//     let response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${apiKey}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4-turbo",
//             messages: [
//                 { role: "system", content: "You are a helpful assistant answering questions about Weijie's research paper." },
//                 { role: "user", content: message }
//             ]
//         })
//     });

//     let result = await response.json();

//     if (result.error) {
//         displayMessage("Error: " + result.error.message, "bot");
//         return;
//     }

//     let botReply = result.choices[0]?.message?.content || "No response from AI.";

//     // Display AI response
//     displayMessage("AI: " + botReply, "bot");

//     // Clear input field
//     inputField.value = "";
// }

// // Display Messages in Chat Window
// function displayMessage(message, sender) {
//     let chatBody = document.getElementById("chat-body");
//     let messageElement = document.createElement("div");
//     messageElement.innerText = message;
//     messageElement.className = sender;
//     chatBody.appendChild(messageElement);
//     chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to latest message
// }

async function sendMessage() {
    let inputField = document.getElementById("chat-text");
    let message = inputField.value.trim();
    if (!message) return;

    displayMessage("You: " + message, "user");

    try {
        let response = await fetch("http://localhost:3000/chat", { // Change URL if deployed
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        let result = await response.json();
        displayMessage("AI: " + result.reply, "bot");
    } catch (error) {
        displayMessage("Error: API not working!", "bot");
        console.error("API Request Error:", error);
    }

    inputField.value = "";
}
