let audio = new Audio();
let isPlaying = false;
let currentSongIndex = -1;

const songs = [
    { file: 'songs/1.mp3', title: 'Tum Hi Ho', cover: 'covers/cover1.jpg' },
    { file: 'songs/2.mp3', title: 'Phir Mohabbat', cover: 'covers/cover2.jpg' },
    { file: 'songs/3.mp3', title: 'Tu Hain Toh', cover: 'covers/cover3.jpg' },
    { file: 'songs/4.mp3', title: 'Apna Bana Le', cover: 'covers/cover4.jpg' },
    { file: 'songs/5.mp3', title: 'Phir Bhi Tumko Chaahunga', cover: 'covers/cover5.jpg' },
    { file: 'songs/6.mp3', title: 'Agar Tum Saath Ho', cover: 'covers/cover6.jpg' },
    { file: 'songs/7.mp3', title: 'Raabta', cover: 'covers/cover7.jpg' },
    { file: 'songs/8.mp3', title: 'O Saathi', cover: 'covers/cover8.jpg' },
    { file: 'songs/9.mp3', title: 'Soch Na Sake', cover: 'covers/cover9.jpg' },
    { file: 'songs/10.mp3', title: 'Soulmate', cover: 'covers/cover10.jpg' }
];

function playSong(file, title, cover) {
    audio.pause();
    audio = new Audio(file);
    audio.play();
    isPlaying = true;
    currentSongIndex = songs.findIndex(song => song.file === file);
    document.getElementById('songTitle').textContent = title;
    document.getElementById('songImage').src = cover;
    updatePlayPauseButton();
    updateProgressBar();
    audio.ontimeupdate = updateSongTime;
}

function updatePlayPauseButton() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
}

function updateProgressBar() {
    const progress = document.getElementById('progress');
    if (!audio.paused) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
    requestAnimationFrame(updateProgressBar);
}

function updateSongTime() {
    const current = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    document.getElementById('songTime').textContent = `${current} / ${duration}`;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

document.getElementById('playPauseBtn').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
    updatePlayPauseButton();
});

function seek(seconds) {
    audio.currentTime += seconds;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const song = songs[currentSongIndex];
    playSong(song.file, song.title, song.cover);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    const song = songs[currentSongIndex];
    playSong(song.file, song.title, song.cover);
}
