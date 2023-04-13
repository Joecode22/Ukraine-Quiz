
//onclick takes you to the high scores page but disables then logging ability by removing the most recent score from local storage
pageHighScore = function (e) {
  e.preventDefault();
  localStorage.removeItem("mostRecentScore");
  return window.location.assign("high-scores.html");
};