//highScores.js

const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
username.addEventListener('input', function() {
  console.log(username.value);
  if (username.value === '') {
    saveScoreBtn.setAttribute('disabled', 'disabled');
  } else {
    saveScoreBtn.removeAttribute('disabled');
  }
});


saveHighScore = function (e) {
console.log('logthis');
e.preventDefault();
}
