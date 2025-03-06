document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully!");
});

function toggleChat() {
    const pageContainer = document.querySelector(".page-container");
    const chatWindow = document.getElementById("chat-window");
    const backgroundOverlay = document.getElementById("background-overlay");

    // 如果聊天窗口未激活，则激活（页面向左移动、聊天窗口和背景淡入）
    if (!chatWindow.classList.contains("active")) {
        pageContainer.classList.add("shift-left");
        chatWindow.classList.add("active");
        backgroundOverlay.style.visibility = "visible";
        backgroundOverlay.style.opacity = "1";
    } else {
        // 否则，恢复原状
        pageContainer.classList.remove("shift-left");
        chatWindow.classList.remove("active");
        backgroundOverlay.style.opacity = "0";
        // 等背景淡出后再隐藏
        setTimeout(function () {
            backgroundOverlay.style.visibility = "hidden";
        }, 1000);
    }
}

// 示例：发送消息的函数（调用 OpenAI API 部分保持原样）
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // 请确保环境变量正确设置

async function sendMessage() {
    let inputField = document.getElementById("chat-text");
    let message = inputField.value.trim();
    if (!message) return;

    displayMessage("You: " + message, "user");

    // 发送请求调用 OpenAI 接口（请确保 API KEY 正确）
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
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

function displayMessage(message, sender) {
    const chatBody = document.getElementById("chat-body");
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.className = sender;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function goBack() {
    window.location.href = 'index.html';
}
