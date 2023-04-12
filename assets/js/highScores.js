//highScores.js

const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
username.addEventListener('keyup', function() {
  console.log(username.value);
  if (username.value === '') {
    saveScoreBtn.classList.add('disabled');
    saveScoreBtn.setAttribute('disabled', 'disabled');
  } else {
    saveScoreBtn.classList.remove('disabled');
    saveScoreBtn.removeAttribute('disabled');
  }
});


saveHighScore = function (e) {
console.log('logthis');
e.preventDefault();
}
