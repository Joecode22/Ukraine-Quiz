const highScoresTable = document.getElementById('highScoresTable').querySelector('tbody');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
console.log(mostRecentScore)
const finalScore = document.getElementById('final-score');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
MAX_HIGH_SCORES = 5;
let scoreSaved = false;



function checkForScore() {
  console.log('This is the most recent score: ' + mostRecentScore)
  finalScore.innerText = '';
  if (!mostRecentScore) {
    finalScore.innerText = 'No Scores Yet';
  } else {
    finalScore.innerText = 'Most Recent Score: ' + mostRecentScore;
  }
}


username.addEventListener('keyup', function () {
  console.log(username.value);
  if (!scoreSaved) {
    saveScoreBtn.disabled = !username.value;
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

// check for a score
checkForScore();
// Populate the table initially
populateHighScoresTable(highScores);

saveHighScore = function (e) {
  e.preventDefault();
  console.log('clicked the save button');
  const newScore = {
    score: mostRecentScore,
    name: username.value
  }

  if (newScore.score === null) {
    console.log('its null!');
    return;
  }



  //logic to manage top 5 scores
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    populateHighScoresTable(highScores);
    scoreSaved = true;
    saveScoreBtn.disabled = true;

};

