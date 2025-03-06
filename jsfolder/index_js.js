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
    typeText(preloaderText, message, 10); // Adjust typing speed (milliseconds) as needed
});


function goToChatPage() {
    // 1) 给 body 添加一个类，用于触发淡出动画
    document.body.classList.add('fade-out');

    // 2) 等待动画结束后再跳转 (此处设置 600ms，可与 CSS transition 匹配)
    setTimeout(() => {
        window.location.href = 'chat.html';
    }, 600);
}


function startTransition() {
    const overlay = document.getElementById('transitionOverlay');
    if (!overlay) {
        console.error("Transition overlay element not found!");
        return;
    }

    // Trigger the CSS animation by adding the 'active' class
    overlay.classList.add('active');

    // After the animation duration (e.g., 3000ms), navigate to the chat page
    setTimeout(() => {
        window.location.href = 'pages/chat.html';
    }, 3000); // Adjust the delay to match your CSS animation duration if needed
}
