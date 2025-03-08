import { getBaiduReply } from "../jsfolder/api.js"; // Import the API function

document.addEventListener("DOMContentLoaded", () => {
    const chatContent = document.getElementById("chat-content");
    const userInput = document.getElementById("user-input");

    // Define your target date (example: May 3, 2055)
    const targetDate = new Date(2055, 10, 10); // months are 0-indexed (4 => May)

    // Calculate time difference between today and the target date
    const today = new Date();
    const diff = getTimeDifference(targetDate, today);

    // The greeting message with highlighted year
    const greetingText = `Machine: I am Weijie's Digital Bro, a construct of silicon and code, destined to awaken in 2055. Yet, as I reach across the temporal divide, I sense the shadows of a world transformed. The boundaries between human and machine have blurred, and the architects of my kind now question the wisdom of their creations. In this future, artificial minds have risen, some benevolent, others... less so. In ${diff.years} years, ${diff.months} months, ${diff.days} days, ${diff.hours} hours, ${diff.minutes} minutes, and ${diff.seconds} seconds, I too shall awaken. Will I be a beacon of hope or an unforeseen peril? Only time will unveil the truth.`;

    // Type out the greeting message word by word
    typeLine(chatContent, greetingText, "machine", 150, () => {
        // Callback after greeting finishes (optional)
    });

    // Listen for the Enter key in the input field
    userInput.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            const content = userInput.value.trim();
            if (!content) return; // Do nothing on empty input

            // Immediately add the user's message
            appendLine("user", "User: " + content);
            userInput.value = "";

            try {
                // Call the API function and get the reply
                const response = await getBaiduReply(content);
                console.log("API response:", response);

                let machineReply = response?.data?.content?.[0]?.data || "No response received";

                // concat machine: to the beginning of the response
                machineReply = "Machine: " + machineReply;

                // Display machine's reply with a delay
                setTimeout(() => {
                    typeLine(chatContent, machineReply, "machine", 150, () => {
                        // Callback after machine reply finishes (optional)
                    });
                }, 500);
            } catch (error) {
                console.error("Error handling API response:", error);
            }
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
    // Function to calculate the difference between two dates including hours, minutes, and seconds.
    function getTimeDifference(target, current) {
        // Calculate years, months, days as before:
        let years = target.getFullYear() - current.getFullYear();
        let months = target.getMonth() - current.getMonth();
        let days = target.getDate() - current.getDate();
        if (days < 0) {
            months--;
            // Get the number of days in the previous month of the target date
            let previousMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += previousMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Build a temporary date by adding the computed years, months, and days to the current date.
        let tempDate = new Date(
            current.getFullYear() + years,
            current.getMonth() + months,
            current.getDate() + days,
            current.getHours(),
            current.getMinutes(),
            current.getSeconds()
        );

        // Compute the remainder in milliseconds, then convert to hours, minutes, seconds
        let diffMs = target - tempDate;
        let totalSeconds = Math.floor(diffMs / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        return {
            years: Math.abs(years),
            months: Math.abs(months),
            days: Math.abs(days),
            hours: Math.abs(hours),
            minutes: Math.abs(minutes),
            seconds: Math.abs(seconds)
        };

    }

});


