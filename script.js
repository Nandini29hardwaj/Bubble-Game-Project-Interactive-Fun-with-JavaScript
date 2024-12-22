var timer = 60;
var score = 0;
var hitRn = 0;

// make bubble 
function makeBubble(){
  var clutter = "";
  for(var i=1;i<=102;i++){
 var rn =  Math.floor(Math.random()*10);
  clutter += `<div class="bubble">${rn}</div> `;
}
document.querySelector("#p-bottom").innerHTML = clutter;
}
makeBubble();

// run timer
function runTimer(){
  var timerInt = setInterval(function(){
    if(timer>0){
      timer--;
      document.querySelector("#timer-val").innerHTML = timer;
    }else{
      clearInterval(timerInt);
      endGame();
    }
  },1000);
}
runTimer();

// get newHit
function getNewHit(){
  hitRn = Math.floor((Math.random()*10));
   document.querySelector("#hit-val").textContent = hitRn;  
}
getNewHit();

// get new score
function increaseScore(){
  score += 10;
  document.querySelector("#score-val").textContent = score;
}

// End game and show score with restart button
function endGame() {
  // Add blink effect
  const main = document.querySelector("#main");
  main.classList.add("blink");
  setTimeout(() => {
    main.classList.remove("blink");

  // Display the game over message and restart button
  document.querySelector("#p-bottom").innerHTML = `
    <h1>Game Over</h1>
    <p>Your Score: <strong>${score}</strong></p>
    <button id="restart-btn">Restart Game</button>
  `;
    // Add click event to the restart button
  document.querySelector("#restart-btn").addEventListener("click", restartGame);
},500);
}

// restart game
function restartGame() {
  timer = 60;
  score = 0;
  document.querySelector("#timer-val").textContent = timer;
  document.querySelector("#score-val").textContent = score;
  document.querySelector("#hit-val").textContent = 0;
  makeBubble();
  getNewHit();
  runTimer();
}
// Handle wrong click (Flash effect + Error message)
function handleWrongClick() {
  const pBottom = document.querySelector("#p-bottom");
  const errorMessage = document.querySelector("#error-message");

  // Flash effect
  pBottom.classList.add("flash");
  setTimeout(() => {
    pBottom.classList.remove("flash");
  }, 200);

  // Show error message
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 500);
}

// event bubbling    
document.querySelector("#p-bottom").addEventListener("click",function(dets){
  var clickedNumber = Number(dets.target.textContent);
  if(clickedNumber == hitRn){
    increaseScore();
    makeBubble();
    getNewHit();
  }
  else{
    getNewHit();
    makeBubble();
    handleWrongClick();
  }
})