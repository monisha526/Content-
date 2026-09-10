const scenes = document.querySelectorAll(".scene");
const particlesContainer = document.getElementById("particles");
const progressBar = document.getElementById("progressBar");
const shareBtn = document.getElementById("shareBtn");
const shareToast = document.getElementById("shareToast");

let currentScene = 0;

const sceneDuration = 8000; // 8 seconds each scene


// =========================
// CREATE PARTICLES
// =========================

for (let i = 0; i < 50; i++) {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        5 + Math.random() * 10 + "s";

    particle.style.animationDelay =
        Math.random() * 5 + "s";

    const size = 2 + Math.random() * 4;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particlesContainer.appendChild(particle);

}


// =========================
// SHOW SCENE
// =========================

function showScene(index) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    scenes[index].classList.add("active");

    updateProgress(index);

}


// =========================
// PROGRESS BAR
// =========================

function updateProgress(index) {

    const progress =
        ((index + 1) / scenes.length) * 100;

    progressBar.style.width = progress + "%";

}


// =========================
// SHARE FUNCTIONALITY
// =========================

function showToast(message) {
    shareToast.textContent = message;
    shareToast.classList.add("show");

    setTimeout(() => {
        shareToast.classList.remove("show");
    }, 2200);
}

async function copyShareLink() {
    const shareUrl = window.location.href;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shareUrl);
            showToast("Link copied!");
            return;
        }

        const tempInput = document.createElement("textarea");
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast("Link copied!");

    } catch (error) {
        showToast("Copy failed. Use the page URL.");
    }
}

async function sharePage() {
    const shareUrl = window.location.href;
    const shareData = {
        title: "Genfahh | Tech Journey",
        text: "Join the Genfahh tech journey and explore innovation, AI, and future ideas.",
        url: shareUrl
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showToast("Shared successfully");
            return;
        }

        await copyShareLink();

    } catch (error) {
        if (error.name !== "AbortError") {
            await copyShareLink();
        }
    }
}

if (shareBtn) {
    shareBtn.addEventListener("click", sharePage);
}


// =========================
// AUTO PLAY
// =========================

function nextScene() {

    currentScene++;

    if (currentScene >= scenes.length) {

        currentScene = 0;

    }

    showScene(currentScene);

}


// Start first scene

showScene(currentScene);


// Change scenes automatically

setInterval(nextScene, sceneDuration);