// Function to animate text one character at a time
function typeText(element, text, speed) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // After the text finishes, wait then fade out preloader and show main content
            setTimeout(() => {
                document.getElementById('preloader').classList.add('fade-out');
                document.getElementById('main-content').style.opacity = '1';
            }, 1000);
        }
    }
    type();
}

// Start the preloader animation on window load
window.addEventListener('load', () => {
    const preloaderText = document.getElementById('preloader-text');
    const message = "Hi, Welcome to Weijie's Website!";
    typeText(preloaderText, message, 200); // Adjust typing speed (milliseconds) as needed
});