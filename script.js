const musicContainer = document.querySelector('.player-card');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');

let heartInterval;

const songs = [
    { title: 'Tu Canción.', artist: 'Esta canción expresa lo que siento por ti.', file: 'musica/Perfecta.mp3', img: 'portadas/foto1.jpeg' },
    { title: 'Nuestra Canción.', artist: 'Esta canción representa nuestro amor.', file: 'musica/CieloEterno.mp3', img: 'portadas/foto2.jpg' },
    { title: 'Para cuando me extrañes.', artist: 'Escucha esa canción cuando me extrañes.', file: 'musica/Cholo.mp3', img: 'portadas/tut.jpg' },
    { title: 'Me acuerdo de ti.', artist: 'Cuando escucho esta canción me acuerdo de ti.', file: 'musica/Huracan.mp3', img: 'portadas/h.jpg' },
    { title: 'Canción que nos mama.', artist: 'Vi que te gustaba en tus compartidos.', file: 'musica/4x4.mp3', img: 'portadas/4x4.jpg' },
    { title: 'Por si dudas de mi amor.', artist: 'Cuando sientas que no te amo escucha esta canción.', file: 'musica/TeOfrezcoUnCorazon.mp3', img: 'portadas/ofrezco.jpg' },
    { title: 'Nosotros bien emocionados.', artist: 'Siento que somos esos ya bien emocionados.', file: 'musica/ElTiernoSeFue.mp3', img: 'portadas/tierno.jpg' },
    { title: 'Nuestra boda.', artist: 'Canción que suene en nuestra boda, para andar bien bélicos alv.', file: 'musica/GOET.mp3', img: 'portadas/g.jpg' },
    { title: 'Anillo de promesa', artist: 'Quiero que suene mientras pongo el anillo en tu dedo.', file: 'musica/AsquerosamenteRico.mp3', img: 'portadas/rico.jpg' },
    { title: 'Ebrio de amor', artist: 'Canción que te cantaria si se me pasaran las copas.', file: 'musica/HermosoCariño.mp3', img: 'portadas/hermoso.jpg' },
    { title: 'Indirecta.', artist: 'Tu eres solo mia.', file: 'musica/TUTUTU.mp3', img: 'portadas/tu.jpg' }
];

let songIndex = 0;
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.file;
    cover.src = song.img;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.innerText = '⏸';
    audio.play();
    if (!heartInterval) heartInterval = setInterval(spawnHeart, 400);
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.innerText = '▶';
    audio.pause();
    clearInterval(heartInterval);
    heartInterval = null;
}

function spawnHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    const duration = Math.random() * 3 + 2;
    heart.style.animationDuration = duration + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    if (musicContainer.classList.contains('play')) audio.play();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    if (musicContainer.classList.contains('play')) audio.play();
});

audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;

});
