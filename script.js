const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPause');
const stopBtn = document.getElementById('stop');
const rewindBtn = document.getElementById('rewind');
const forward10Btn = document.getElementById('forward10');
const forward1minBtn = document.getElementById('forward1min');
const forward10minBtn = document.getElementById('forward10min');
const muteBtn = document.getElementById('mute');
const volumeSlider = document.getElementById('volume');
const fullscreenBtn = document.getElementById('fullscreen');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const videoSelect = document.getElementById('videoSelect');

// Update time display
video.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
    currentTimeDisplay.textContent = formatTime(video.currentTime);
});

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Stop
stopBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    playPauseBtn.textContent = 'Play';
});

// Rewind 10 seconds
rewindBtn.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
});

// Forward 10 seconds
forward10Btn.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

// Forward 1 minute
forward1minBtn.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 60);
});

// Forward 10 minutes
forward10minBtn.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 600);
});

// Mute/Unmute
muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
});

// Volume adjustment
volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
});

// Fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { // Safari
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE11
        video.msRequestFullscreen();
    }
});

// Load selected video from playlist
videoSelect.addEventListener('change', () => {
    video.src = videoSelect.value;
    video.load();
    video.play();
});

// Format time for display
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'Space':
            event.preventDefault();
            playPauseBtn.click();
            break;
        case 'Digit0':
            stopBtn.click();
            break;
        case 'KeyJ':
            rewindBtn.click();
            break;
        case 'KeyH':
            forward10Btn.click(); // Corrected reference
            break;
        case 'KeyK':
            forward1minBtn.click();
            break;
        case 'KeyL':
            forward10minBtn.click();
            break;
        case 'ArrowUp':
            volumeSlider.value = Math.min(1, parseFloat(volumeSlider.value) + 0.1);
            volumeSlider.dispatchEvent(new Event('input'));
            break;
        case 'ArrowDown':
            volumeSlider.value = Math.max(0, parseFloat(volumeSlider.value) - 0.1);
            volumeSlider.dispatchEvent(new Event('input'));
            break;
        case 'KeyF':
            fullscreenBtn.click();
            break;
        case 'KeyM':
            muteBtn.click();
            break;
    }
});
