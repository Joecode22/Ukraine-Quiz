const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
username.addEventListener('keyup', () => {
  console.log(username.value);
  saveScoreBtn.disabled = username.value === '';
})

saveHighScore = function (e) {
console.log('logthis');
e.preventDefault();
}
