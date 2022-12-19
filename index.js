const video = document.getElementById("video");
const video_btn = document.querySelector('#video-btn');

let is_playing = false;
let original_pause_time = 0;
let fast_pause_time = 0;
let level = "";
let original_sections = [0, 55, 148, 221, 343];
let fast_sections = [0, 21, 36, 48.5, 76];//ゆくゆくは累積和で求めればいい

video_btn.addEventListener('click', () => {
  if (!is_playing) {
    video.play();
    is_playing = true;
  } else {
    video.pause();
    is_playing = false;
  }
});

function setStartTime() {
  if (level === "original") {

    video.currentTime = original_pause_time;
  } else {
    let ind = 0;
    while (original_pause_time > original_sections[ind]) {
      ind++;
    }
    video.currentTime = fast_sections[ind - 1];
  }
}

function timingOfSwitchover() {
  if (level === "fast") {
    original_pause_time = video.currentTime;
  }
}

function changeVideo(l) {
  level = l;
  timingOfSwitchover();
  video.src = `videos/video_${l}.mp4`;
  setStartTime();
  video.play();
  is_playing = true;
}

//再生位置の取得
// video.addEventListener('timeupdate', function() {
//     if (video.currentTime !== 0) {
//       return timeConvert(video.currentTime)
//       // console.log(timeConvert(video.currentTime));
//     } else {
//       console.log('0:00');
//     }
//   })
  //数値型から”00：00”表記への変換（秒、ミリ秒の場合）
  // function timeConvert(time) {
  //   var sec = Math.floor(time);
  //   var msec = ((time - sec) * 100).toFixed(0);
  //   return sec + ':' + msec;
  // }