// Outrider Circle base script file
console.log("script.js loaded");
// === CONFIG ===
// Your Google Apps Script endpoint
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyLIEZIcBEzY53UoA0pRPNmNFebR-uOhhYt8llZfjduxzrKpN1onZZfescOw1mjS5hT/exec";

// Attach listeners when page loads
document.addEventListener("DOMContentLoaded", function () {

    const digitalBtn = document.getElementById("joinDigital");
    const fullBtn = document.getElementById("joinFull");

    // Digital Membership Button
    digitalBtn.addEventListener("click", function (event) {
        event.preventDefault();
        requestAccessCode("digital");
    });

    // Full Membership Button
    fullBtn.addEventListener("click", function (event) {
        event.preventDefault();
        requestAccessCode("full");
    });
});

// === MAIN FUNCTION ===
function requestAccessCode(type) {

    const loadingMsg = "Generating your secure access code...";
    alert(loadingMsg);

    fetch(`${GOOGLE_SCRIPT_URL}?membership=${type}`)
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);

            if (data.status === "success") {
                const code = data.code;

                alert("Your Access Code: " + code);

                // TODO: later redirect to payment or app download page
                // window.location.href = "/access.html?code=" + code;

            } else {
                alert("There was a problem generating your code. Try again.");
            }
        })
        .catch(err => {
            alert("Error connecting to server.");
            console.error(err);
        });
}
// =========================
// PWA INSTALL HANDLER
// =========================

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("Service Worker registered"))
        .catch(err => console.log("SW registration failed", err));
}

// Handle PWA installation prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("PWA install prompt captured");
    
    // Optional: show a custom "Install App" button later
    // document.getElementById("installBtn").style.display = "block";
});

// Call this if you want a manual "Install App" button later
async function installPWA() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    console.log("Install choice:", result.outcome);
    deferredPrompt = null;
}
