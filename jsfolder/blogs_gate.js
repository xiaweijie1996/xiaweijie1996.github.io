document.addEventListener('DOMContentLoaded', () => {
    const BLOG_PASSWORD = 'weijie-private';
    const BLOG_SESSION_KEY = 'blogsUnlocked';
    const PASSWORD_NOTICE = 'This space is mainly for my personal notes and is password-protected 🔒. Please enter the password to access it :)';

    if (sessionStorage.getItem(BLOG_SESSION_KEY) === 'true') {
        return;
    }

    const userInput = window.prompt(PASSWORD_NOTICE);

    if (userInput === null) {
        window.location.href = '../../index.html';
        return;
    }

    const passwordInput = userInput.trim();

    if (passwordInput !== BLOG_PASSWORD) {
        window.alert('Wrong password. Returning to home page.');
        window.location.href = '../../index.html';
        return;
    }

    sessionStorage.setItem(BLOG_SESSION_KEY, 'true');
});
