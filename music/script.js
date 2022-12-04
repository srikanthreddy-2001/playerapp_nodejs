const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const songs = [
  {
    name: "kk1",
    displayName: "Pal",
    artist: "Krishnakumar Kunnath(KK)",
  },
  {
    name: "kk2",
    displayName: "Khuda Jane",
    artist: "Krishnakumar Kunnath(KK)",
  },
  {
    name: "kk3",
    displayName: "Thadap Thadap",
    artist: "Krishnakumar Kunnath(KK)",
  },
  {
    name: "kk4",
    displayName: "Kya mujhe pyaar hain ",
    artist: "Krishnakumar Kunnath(KK)",
  },
];


// play and pause my song
let isPlaying= false;
function playSong(){
  isPlaying=true;
  playBtn.classList.replace("fa-play","fa-pause")
  playBtn.setAttribute("title","pause");
  music.play()
}
function pauseSong(){
  isPlaying=false;
  playBtn.classList.replace("fa-pause","fa-play")
  playBtn.setAttribute("title","play");
  music.pause()

}


function loadSong(song){

  title.textContent=song.displayName;
  artist.textContent=song.artist;
  image.src=`img/${song.name}.jpg`
  music.src=`music/${song.name}.mp3`
}

let songIndex=0
function previousSong(){
  songIndex--;

  if(songIndex<0){
    songIndex=songs.length-1
  }
  loadSong(songs[songIndex])
  playSong()

}

function nextSong(){
  songIndex++;
  if(songIndex>songs.length-1){
    songIndex=0;
  }
  loadSong(songs[songIndex])
  playSong()

}


function updateProgrssBar(e){
  if(isPlaying){
    console.log("event",e)

    const {currentTime, duration}=e.target;
    console.log("current Time",currentTime)
    console.log("total duration of the song",duration)

    const progressPercentage=(currentTime/duration)*100
    console.log(progressPercentage)
    progress.style.width=`${progressPercentage}%`
 
    const durationMinutes=Math.floor(duration/60)
    let durationSeconds=Math.floor(duration%60)
    if(durationSeconds<10){
      durationSeconds=`0${durationSeconds}`

    }
    const currentMinutes=Math.floor(currentTime/60)
    let currentSeconds=Math.floor(currentTime%60)
    if(currentSeconds<10){
      currentSeconds=`0${currentSeconds}`
    }
   
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

       //nan issue
       if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`
       }
  }
}

function clickProgrssBar(e){
  const width=this.clientWidth;
  const progresswidth=e.offsetX;
  console.log("this",this)
  console.log("width",width)
  const {duration}=music;
  console.log("progresswidth",progresswidth)
  music.currentTime=(progresswidth/width)*duration

}
playBtn.addEventListener("click",()=>{
  isPlaying?pauseSong():playSong()
})
prevBtn.addEventListener("click", previousSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended",nextSong)
music.addEventListener("timeupdate",updateProgrssBar)
progressContainer.addEventListener("click",clickProgrssBar)