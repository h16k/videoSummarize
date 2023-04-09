const video = document.getElementById("video");
const video_btn = document.querySelector('#video-btn');

let is_playing = false;
let normal_pause_time = 0;
let summary_pause_time = 0;
let level = "";
// let original_sections = [0, 55, 148, 221, 343];
// let fast_sections = [0, 21, 36, 48.5, 76];//ゆくゆくは累積和で求めればいい
let normal_sections = [5.64, 12.71, 20.11, 24.99, 33.14, 39.49, 46.17, 50.94, 62.03, 68.5, 81.46000000000001, 90.65, 96.67, 109.93, 117.75, 124.46, 129.98999999999998, 138.29999999999998, 146.46999999999997, 153.45999999999998, 158.86999999999998, 166.73, 176.51, 187.29, 198.03, 206.17000000000002, 217.08, 228.08]
let summary_sections = [24.57, 62.31, 96.22]

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
  if (level === "normal") {

    video.currentTime = normal_pause_time;
  } else {
    let ind = 0;
    while (normal_pause_time > normal_sections[ind]) {
      ind++;
    }
    video.currentTime = summary_sections[ind - 1];
  }
}

function timingOfSwitchover() {
  if (level === "summary") {
    normal_pause_time = video.currentTime;
  }
}

function changeVideo(l) {
  level = l;
  timingOfSwitchover();
  video.src = `videos/${l}.mp4`;
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