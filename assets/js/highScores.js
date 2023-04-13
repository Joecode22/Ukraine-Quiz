const highScoresTable = document.getElementById('highScoresTable').querySelector('tbody');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('final-score');

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

MAX_HIGH_SCORES = 5;

finalScore.innerText = 'Most Recent Score: ' + mostRecentScore;
username.addEventListener('keyup', function () {
  if (username.value === '') {
    saveScoreBtn.classList.add('disabled');
    saveScoreBtn.setAttribute('disabled', 'disabled');
  } else {
    saveScoreBtn.classList.remove('disabled');
    saveScoreBtn.removeAttribute('disabled');
  }
});

function populateHighScoresTable(highScores) {
  highScoresTable.innerHTML = ''; // Clear existing table rows

  highScores.forEach((scoreEntry, index) => {
    const row = document.createElement('tr');

    const rankCell = document.createElement('td');
    rankCell.textContent = index + 1;
    row.appendChild(rankCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = scoreEntry.name;
    row.appendChild(nameCell);

    const scoreCell = document.createElement('td');
    scoreCell.textContent = scoreEntry.score;
    row.appendChild(scoreCell);

    highScoresTable.appendChild(row);
  });
}

// Populate the table initially
populateHighScoresTable(highScores);

saveHighScore = function (e) {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };

  //logic to manage top 5 scores
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  // Update the high scores table
  populateHighScoresTable(highScores);
};
