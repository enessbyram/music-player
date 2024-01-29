const container = document.querySelector('.container')
const image = document.querySelector('.img #music-img')
const title = document.getElementById('title')
const singer = document.getElementById('singer')
const prev = document.getElementById('prev')
const play = document.getElementById('play')
const next = document.getElementById('next')
const duration = document.getElementById('duration')
const currentTime = document.getElementById('currentTime')
const progressBar = document.getElementById('progress-bar')
const volume = document.getElementById('volume')
const volumeBar = document.getElementById('volume-bar')
const collapse = document.getElementById('music-list')
const list = document.getElementById('list')
const ul = document.querySelector('ul')

const player = new MusicPlayer(musicList)


window.addEventListener("load", () => {
    let music = player.getMusic() 
    displayMusic(music)
    displayMusicList(player.musicList)
    isPlaying()
})

function displayMusic(music) {
    title.innerText = music.getName()
    singer.innerText = music.singer
    image.src = "photos/" + music.img
    audio.src = "music/" + music.file
}

play.addEventListener('click', () => {
    const isMusicPlaying = container.classList.contains('playing')
    isMusicPlaying ? pauseMusic() : playMusic()
})

prev.addEventListener('click', () => {
    prevMusic()
})

function prevMusic() {
    player.prev()
    let music = player.getMusic()
    displayMusic(music)
    playMusic()
    isPlaying()
}

next.addEventListener('click', () => {
    nextMusic()
})

function nextMusic() {
    player.next()
    let music = player.getMusic()
    displayMusic(music)
    playMusic()
    isPlaying()
}

function pauseMusic() {
    container.classList.remove('playing')
    audio.pause()
    play.classList.remove('fa-pause')
    play.classList.add('fa-play')
}

function playMusic() {
    container.classList.add('playing')
    audio.play()
    play.classList.remove('fa-play')
    play.classList.add('fa-pause')
}

function calculateTime(second) {
    const dakika = Math.floor(second / 60)
    const saniye = Math.floor(second % 60)
    const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`
    const sonuc = `${dakika}:${guncellenenSaniye}`
    return sonuc
}

audio.addEventListener('loadedmetadata', () => {
    duration.textContent = calculateTime(audio.duration) 
    progressBar.max = Math.floor(audio.duration)
})

audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime)
    currentTime.textContent = calculateTime(progressBar.value)
})

progressBar.addEventListener('input', () => {
    currentTime.textContent = calculateTime(progressBar.value)
    audio.currentTime = progressBar.value
})

let muteState = "unmuted"

volumeBar.addEventListener('input', (e) => {
    const value = e.target.value
    audio.volume = value / 100
    if(value == 0) {
        audio.muted = true
        muteState = 'muted'
        volume.classList = 'fa-solid fa-volume-xmark'
    }else {
        audio.muted = false
        muteState = 'unmuted'
        volume.classList = 'fa-solid fa-volume-high'
    }
})

volume.addEventListener('click', () => {
    if (muteState === 'unmuted') {
        audio.muted = true
        muteState = 'muted'
        volume.classList = 'fa-solid fa-volume-xmark'
        volumeBar.value = 0
    } else {
        audio.muted = false
        muteState = 'unmuted'
        volume.classList = 'fa-solid fa-volume-high'
        volumeBar.value = 100
    }
})

list.addEventListener('click', () => {
    collapse.classList.toggle('active')
})

const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
        let liTag = `
            <li li-index='${i}' onclick='selectedMusic(this)' class="list-element">
                <span>${list[i].getName()}</span>
                <span id="music-${i}"></span>
                <audio class="music-${i}" src="music/${list[i].file}"></audio>
            </li>
        `
        ul.insertAdjacentHTML("beforeend", liTag)

        let liAudioDuration = ul.querySelector(`#music-${i}`)
        let liAudioTag = ul.querySelector(`.music-${i}`)

        liAudioTag.addEventListener('loadeddata', () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration)
        })
    }
}

const selectedMusic = (li) => {
    const index = li.getAttribute("li-index")
    player.index = index
    displayMusic(player.getMusic())
    playMusic()
    isPlaying()
}

const isPlaying = () => {
    for(let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")) {
            li.classList.remove("playing")
        }

        if(li.getAttribute("li-index") == player.index){
            li.classList.add("playing")
        }
    } 
}

audio.addEventListener('ended', () => {
    nextMusic()
})