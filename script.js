const img = document.querySelector("img");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressEl = document.getElementById("progress");
const progressContainerEl = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEL = document.getElementById("duration");
const volumeRange = document.getElementById("volume-range");
const volumeIcon = document.getElementById("volume-icon");

const songs = [
  {
    name: "amr-diab-wmalo",
    displayName: "Wmalo",
    artist: "Amr Diab",
  },
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
  {
    name: "amr-diab-anta-elhaz",
    displayName: "Anta Elhaz",
    artist: "Amr Diab",
  },
];

let isPlaying = false;
let songIndex = 0;

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-circle-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-circle-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const updateProgressBar = (event) => {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEL.textContent = `${durationMinutes}: ${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
  }
};

const setProgressBar = (e) => {
  console.log(e);
  const width = e.srcElement.clientWidth;
  const offsetX = e.offsetX;
  const { duration } = music;
  music.currentTime = (offsetX / width) * duration;
};

const setVolume = () => {
  music.volume = volumeRange.value / 100;
  if (music.volume === 0) {
    volumeIcon.classList.replace("fa-volume-high", "fa-volume-mute");
  } else if (music.volume < 0.5) {
    volumeIcon.classList.replace("fa-volume-high", "fa-volume-low");
  } else {
    volumeIcon.classList.replace("fa-volume-low", "fa-volume-high");
  }
};

const toggleVolumeRange = () => {
  volumeRange.style.display =
    volumeRange.style.display === "block" ? "none" : "block";
};

volumeIcon.addEventListener("click", toggleVolumeRange);

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainerEl.addEventListener("click", setProgressBar);
volumeRange.addEventListener("input", setVolume);

const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
};

loadSong(songs[songIndex]);
