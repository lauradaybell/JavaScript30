const player = document.getElementById('player')
const video = document.getElementById('viewer')
const progress = document.getElementById('progress')
const progressBar = document.getElementById('progressBar')
const toggle = document.getElementById('toggle')
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = ()=>  {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this)
    video.currentTime += parseFloat(this.dataset.skip)
    console.log(this.dataSet)
}
function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}




video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)


skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mouseover', handleRangeUpdate))

let mousedown = false

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e))
progress.addEventListener('mousedown', ()=> mousedown = true)
progress.addEventListener('mouseup',()=> mousedown = false)





toggle.addEventListener('click', togglePlay)

