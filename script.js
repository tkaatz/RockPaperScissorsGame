let userWins = 0;

let draws = 0;

let cpuWins = 0;


const option = document.getElementsByClassName('option');

const options = document.querySelectorAll('.option');


console.log('game start: waiting for user to select and confirm move. user selection: ' + userSelection.alt + ', cpu selection: ' + cpuSelection.alt);




//updates user selection once a move is selected & runs userConfirm() to display confirm button.


for (const element of option) {


  element.addEventListener('click', () => {


    ({src: userSelection.src, alt: userSelection.alt} = element);

    console.log ('user selected: ' + userSelection.alt);

    userConfirm();


  });


};




  //displays confirm button after user selects a move.


  function userConfirm() {


    if (userSelection.alt != 'cover') {
    

      directions.textContent = null;

      confirmButton.style.display = "block";
    
      console.log('user selection updated to ' + userSelection.alt + '. waiting for user to confirm or update move.');


    };


  };




//starts round after user confirms move.


confirmButton.onclick = async function() {

  
  console.log('user move confirmed: ' + userSelection.alt)


  roundStartDisplay();


  await gameCountdown();


  console.log('game countdown complete.')


  getCpuMove();


  getResult();


  roundEndDisplay();


};


  //removes user options and updates game directions. userMove assigned.


  function roundStartDisplay() {


    options.forEach(option => {


      option.style.display = 'none';
  

    });


    confirmButton.style.display = null
    

    directions.style.textDecoration = "none";
  
    directions.textContent = 'Round In Progess...';


    userMove = userSelection.alt


    console.log('round started. display updated. running round with user move: ' + userMove);


    return userMove


  };




  //displays animated gameplay text.


  function gameCountdown() {


    const countdown = ['rock', 'paper', 'scissors', 'show!'];
    
    const delay = 500;


    //creates promise and is resolved when countdownLoop is complete

    return new Promise(resolve => {


      async function countdownLoop() {


        for (let i = 0; i < countdown.length; i++) {


          //creates promise and awaits for setTimeout to display i for "delay" amount of time.

          await new Promise(resolve => {


            setTimeout(() => {


              gameplayText.textContent = countdown[i];

              gameplayText.style.opacity = 1;

              resolve();


            }, delay);


          });
        

          //creates promise and awaits for setTimeout to hide i for "delay" amount of time.  

          await new Promise(resolve => {


            setTimeout(() => {


              gameplayText.style.opacity = 0;

              resolve();


            }, delay);
            

          });


        };


      };


      //calls countdownLoop function, once countdownLoop is complete it then resolves promise created at beginning of function.

      countdownLoop().then(() => resolve());


    });


  };




  //Selects random move for cpu. cpuMove assigned.
  

  function getCpuMove() {


    const rock = document.getElementById('rock');

    const paper = document.getElementById('paper');
    
    const scissors = document.getElementById('scissors');


    const cpuOptions = [rock, paper, scissors];

    const cpuNumSelection = Math.floor(Math.random() * cpuOptions.length);

    cpuMoveSelection = cpuOptions[cpuNumSelection];


    cpuMove = cpuMoveSelection.alt;

    console.log('cpu selected: ' + cpuMove);


    return [cpuMoveSelection, cpuMove]


  };




  //determines round result using gameRules function.


  function getResult() {


    result = gameRules()[userMove][cpuMove];
  
    console.log('round result is user: ' + result);


    return result


  };




    //rules for round result based on user selection.


    function gameRules() {


      const outcome = {


        'rock': {'rock': 'draw', 'paper': 'defeat', 'scissors': 'victory!'},
        'paper': {'rock': 'victory!', 'paper': 'draw', 'scissors': 'defeat'},
        'scissors': {'rock': 'defeat', 'paper': 'victory!', 'scissors': 'draw'},


      };


      return outcome;


    };




  //displays cpu move, gameplay text with result, and updates score


  function roundEndDisplay() {


    ({src: cpuSelection.src, alt: cpuSelection.alt} = cpuMoveSelection);


    gameplayText.textContent = result

    gameplayText.style.opacity = 1


    scoreCounter(result);

    updateScore();


    playAgain();


  };
    



    //updates score value.


    function scoreCounter(result){
    
    
      if (result === 'victory!') {

        userWins++

      }
        
      else if (result === 'draw') {

        draws++

      }
        
      else if (result === 'defeat') {

        cpuWins++

      };
    
    
    };




    //updates score display text.


    function updateScore() {


      score = document.getElementById('score');

      score.innerText = `${userWins} - ${draws} - ${cpuWins}`;
    
    
    };




    //displays reset button.


    function playAgain() {


      directions.textContent = null;

      resetButton.style.display = "block";

      
    };




//starts new round when user selects resetButton


resetButton.onclick = function(){


  console.log ('user selected to play again.');


  resetButton.style.display = null;

  gameplayText.textContent = null;

  userSelection.src = 'images/cover.png';
  userSelection.alt = 'cover';

  cpuSelection.src = 'images/cover.png';
  cpuSelection.alt = 'cover';

  directions.style.textDecoration = "underline";

  directions.textContent = 'Select Your Move!';

  let round = document.getElementById('round');

  round.innerHTML = parseInt(round.innerHTML) + 1;


  options.forEach(option => {


    option.style.display = 'inline';


  });


  console.log('game ready for round ' + round.innerHTML);


};






