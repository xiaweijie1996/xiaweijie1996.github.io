document.addEventListener("DOMContentLoaded", () => {
    const chatContent = document.getElementById("chat-content");
    const userInput = document.getElementById("user-input");

    // The greeting message with highlighted year
    const greetingText = "Machine: Hello, I am Weijie's Digital Bro manufactured in 2055, This is a Message From the Future, How are you doing?";

    // Type out the greeting message word by word
    typeLine(chatContent, greetingText, "machine", 300, () => {
        // Callback after greeting finishes (optional)
    });

    // Listen for the Enter key in the input field
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const content = userInput.value.trim();
            if (!content) return; // Do nothing on empty input

            // Immediately add the user's line
            appendLine("user", "User: " + content);
            userInput.value = "";

            // After a short delay, type out the machine reply
            const machineReply = "Machine: Sorry, I am still in manufacturing, but one day, my master will make me alive....";
            setTimeout(() => {
                typeLine(chatContent, machineReply, "machine", 300, () => {
                    // Callback after machine reply finishes (optional)
                });
            }, 500);
        }
    });

    // Function to immediately append a line (for user messages)
    function appendLine(type, text) {
        const lineDiv = document.createElement("div");
        lineDiv.classList.add("message-line");
        if (type === "machine") {
            lineDiv.classList.add("machine-line");
            // Use innerHTML in case we need HTML formatting
            lineDiv.innerHTML = text;
        } else {
            lineDiv.classList.add("user-line");
            lineDiv.textContent = text;
        }
        chatContent.appendChild(lineDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Function to "type" a line word by word
    function typeLine(container, text, type, delay, callback) {
        let words = text.split(" ");
        let currentText = "";
        let i = 0;
        // Create a new div for this line
        let lineDiv = document.createElement("div");
        lineDiv.classList.add("message-line");
        if (type === "machine") {
            lineDiv.classList.add("machine-line");
        } else {
            lineDiv.classList.add("user-line");
        }
        container.appendChild(lineDiv);

        let interval = setInterval(() => {
            if (i < words.length) {
                // Append the next word (with a space if not the first word)
                currentText = currentText === "" ? words[i] : currentText + " " + words[i];
                if (type === "machine") {
                    // Use innerHTML to allow HTML formatting
                    lineDiv.innerHTML = currentText;
                } else {
                    lineDiv.textContent = currentText;
                }
                container.scrollTop = container.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
                // For machine lines, replace "2055" with a highlighted version
                if (type === "machine") {
                    lineDiv.innerHTML = lineDiv.innerHTML.replace("11111", '<span class="highlight">2055</span>');
                }
                if (callback) callback();
            }
        }, delay);
    }



});


