console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('rick.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "On & On - Cartoon,Daniel Levi", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Heros Tonight- Janji", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Fearless - Lost Sky", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Why We Loose - Cartoon", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Mortals - Worriyo", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
const volumeBar = document.getElementById('volumeBar');

// Add an event listener to update the volume when the user interacts with the volume bar
volumeBar.addEventListener('input', () => {
    const volume = parseFloat(volumeBar.value);
    audioElement.volume = volume;
});
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    // Update Current Time
    const currentTimeMinutes = Math.floor(audioElement.currentTime / 60);
    const currentTimeSeconds = Math.floor(audioElement.currentTime % 60);
    const formattedCurrentTime = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;
    document.getElementById('currentTime').textContent = formattedCurrentTime;

    // Update Total Time
    const totalTimeMinutes = Math.floor(audioElement.duration / 60);
    const totalTimeSeconds = Math.floor(audioElement.duration % 60);
    const formattedTotalTime = `${totalTimeMinutes}:${totalTimeSeconds < 10 ? '0' : ''}${totalTimeSeconds}`;
    document.getElementById('totalTime').textContent = formattedTotalTime;
});

myProgressBar.addEventListener('input', () => {
    const seekTime = (myProgressBar.value * audioElement.duration) / 100;
    audioElement.currentTime = seekTime;
});