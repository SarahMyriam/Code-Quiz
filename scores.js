function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // (optional) sort highscores by score property in descending order
  highscores.sort(function(a,b){
    return b.score -a.score;
  })

   // create li tag for each high score
   var liTag = document.createElement("li");
   liTag.textContent = score.intitials + " _ " + score.score;

   // display on page
   var orderedlistElement = document.getElementById("highscores");
   orderedlistElement.appendChild(liTag);

}


function clearHighscores() {
  highscores = [];
   // (and reload)
   location.reload();

}

// attache clear event to clear score button
document.getElementById("clear").onclick = clearHighscores;

// run printhighscore when page loads
showHighscores();
