// Create app object (pokemonApp)
const pokemonApp = {};

// creating an apiURL
pokemonApp.apiURL = 'https://pokeapi.co/api/v2/pokemon/';

// Create initialization method (pokemonApp.init)
pokemonApp.init = () => {
    // new variable for amount of pokemon
    pokemonApp.limit = 1;
    // variable for the amount of rings displayed
    pokemonApp.totalRings = 40;
    pokemonApp.blur = 0;
    // pokemonApp.getPokemon();
    pokemonApp.randomPokemon();
    // pokemonApp.help();
    pokemonApp.eventListenerSetUp();

};

// // Create a method which will request information for the API (pokemonApp.getPokemon)
// // Currently not in use
// pokemonApp.getPokemon = () => {
//     const url = new URL(pokemonApp.apiURL);
//     url.search = new URLSearchParams({
//         limit : pokemonApp.limit,
//     });

//     fetch(url)
//     .then (function(apiResponse) {
//         return apiResponse.json()
//     })
//     .then (function(jsonResponse) {
//         pokemonApp.tallyName(jsonResponse);
//     });
// };

// // create a method that will tally the pokemon name length 
// // Currently not in use
// pokemonApp.tallyName = (pokemonObject) => {
//     let longestName = "";
//     pokemonObject.results.forEach( (pokemon) => {
//         if (pokemon.name.length > longestName.length) {
//             longestName = pokemon.name;
//         }
//     }) 

//     console.log(`${longestName} is the longest character name with ${longestName.length}`);
    
//     let numOfPokemon = 0;
//     let charLength = 0;
//     pokemonApp.numOfCharLength = {};
//     // initial setting numOfCharLength to 0
//     for (let index = 0; index <= longestName.length; index++) {
//         pokemonApp.numOfCharLength[index] = 0;
//     };

//     pokemonObject.results.forEach( (pokemon) => {
//         // only get pokemon that contains letters
//         if (/^[a-zA-Z]+$/.test(pokemon.name)) {
//             // console.log(pokemon.name);
//             while (charLength <= longestName.length) {
//                 // console.log(charLength);
//                 // console.log(longestName.length);
//                 if (pokemon.name.length == charLength) {
//                     // console.log(pokemon.name.length);
//                     numOfPokemon++;
//                     // console.log(numOfPokemon, pokemon.name, pokemon.name.length);
//                     pokemonApp.numOfCharLength[charLength] = pokemonApp.numOfCharLength[charLength] + 1;
//                 }
//                 charLength++;
//             }
//             charLength = 0;
//         }
//         // total number of pokemons
//         pokemonApp.numOfCharLength[0] = numOfPokemon;
//     }) 
//     console.log(pokemonApp.numOfCharLength);
// };

// Build a method that will grab the URL of the random pokemon (pokemonApp.randomPokemon)
pokemonApp.randomPokemon = () => {

    randomIndex = Math.floor(Math.random() * pokemonApp.limit + 4);
    
    // Calling the array with the random number given to find the pokemon
    pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomIndex}`

    fetch(pokemonUrl)
    .then (function(aResponse) {
        return aResponse.json()
    })
    .then (function(jResponse) {
        pokemonApp.chosenPokemon(jResponse);
        pokeName = jResponse.forms[0];
        console.log(jResponse.forms[0].name);
        // if the pokemon return contains special characters or numbers run again
        if (!/^[a-zA-Z]+$/.test(jResponse.forms[0].name)) {
            pokemonApp.randomPokemon();
        };
    });

    pokemonApp.colourRings();
    pokemonApp.stats.totalGames++;
};

// Build a method that will display the picture of the chosen pokemon and append it (pokemonApp.chosenPokemon)
pokemonApp.chosenPokemon = (dataFromRandomPokemon) => {
    // create variable to hold picture URL given from pokeAPI.co
    pokemonApp.chosenPokemonPicture = dataFromRandomPokemon.sprites.other['official-artwork']['front_default'];
    pokemonApp.chosenPokemonName = dataFromRandomPokemon.name;

    document.querySelector('.leftPanel img').src = pokemonApp.chosenPokemonPicture
    document.querySelector('.leftPanel img').style.filter = `blur(${pokemonApp.blur}px)`;

    // adding a variable to keep track of guesses
    pokemonApp.numberOfGuesses = 0;
    // adding a variable to store name of pokemon
    pokemonApp.pokemonName = dataFromRandomPokemon.name.toLowerCase();
    // adding an array for the random pokemon chosen
    pokemonApp.pokemonNameArray = pokemonApp.pokemonName.split("");
};

// Build a method that will display pokemon img and name on a pop up upon correct guess (pokemonApp.correctAnswer)
// Restarts when the user clicks “Play again” (eventListener)

// Create a method that will blur picture with rings
pokemonApp.colourRings = () => {
    // Create a canvas that will live on top of imgContainer
    const canvasElement = document.createElement('canvas');
    document.querySelector('.imgContainer').appendChild(canvasElement);

    // call the to create get 50 ring locations
    pokemonApp.ringLocation();
    
    // draw the rings on the canva
    for (let i = 0; i < pokemonApp.totalRings; i++){
        pokemonApp.drawRing(pokemonApp.ringLocation[i].x, pokemonApp.ringLocation[i].y, pokemonApp.ringLocation[i].color)
        };
};

//create a method which create and store 50 ring at a random location
pokemonApp.ringLocation = () => {
    for (let numberOfRings = 0; numberOfRings < pokemonApp.totalRings; numberOfRings++) {
        let x = Math.floor(Math.random() * 150 + 75);
        let y = Math.floor(Math.random() * 150);
        let color = pokemonApp.randomColour();
        pokemonApp.ringLocation[numberOfRings] = {
            x: x,
            y: y,
            color: color,
        }
    }
};

// create a method that will draw the ring at a given locationa and colour
pokemonApp.drawRing = (x, y, color) => {
    pokemonApp.canvas = document.querySelector('canvas').getContext('2d');
    let radius = 25;

    pokemonApp.canvas.beginPath();
    pokemonApp.canvas.arc(x, y, radius, 0, 2 * Math.PI);
    pokemonApp.canvas.arc(x, y, radius-10, 0, 2 * Math.PI);
    pokemonApp.canvas.fillStyle = color;
    pokemonApp.canvas.fill("evenodd");
};

// create a method that randomly returns a colour 
pokemonApp.randomColour = () => {
    const colourPicker = Math.floor(Math.random() * 4);
    if (colourPicker === 0) {
        return '#ff0000'
    } else if (colourPicker === 1) {
        return '#3b4cca'
    } else if (colourPicker === 2) {
        return '#ffde00'
    } else  {
        return '#b3a125'
    };
};

// create a method that creates the helpTab
pokemonApp.helpTab = () => {
    helpTabDivElement = document.createElement('div');
    helpTabDivElement.classList.add('helpTab')

    helpTabDivElement.innerHTML = `
        <h3>How to Play!</h3>
        <i class="fa-solid fa-xmark"></i>
        <p>Guess that Pokemon in six tries.</p>
        <p>Hit the enter button or click the pokeball to submit.</p>
        <p>After each guess, the number of rings decrease.</p>
        <p>Also after each guess, the colour of the letters will change to show how close your guess was to the Pokemon.</p>
        <p><span class="correctPosition">Blue</span>: The letter is in the word and in the correct spot.</p>
        <p><span class="correctLetter">Yellow</span>: The letter is in the word but in the wrong spot.</p>
    `;
    return helpTabDivElement;
};

// new object to store data of tries;
pokemonApp.stats = {
    tries1: 0,
    tries2: 0,
    tries3: 0,
    tries4: 0,
    tries5: 0,
    tries6: 0,
    totalGuesses: 0,
    totalGames: 0,
    totalCorrect: 0,
};

// create a method to increase the amount of tries and total guesses and correct
pokemonApp.scoreboard = (guessNumber) => {
    pokemonApp.stats[`tries${guessNumber}`]++
    console.log(pokemonApp.stats);
};

// create a method that creates the scoreboard
pokemonApp.scoreboardDisplay = () => {
    scoreboardDisplayDivElement = document.createElement('div');
    scoreboardDisplayDivElement.classList.add('scoreboardDisplay');
    scoreboardDisplayDivElement.id = 'scoreboardDisplay';
    scoreboardDisplayDivElement.innerHTML = `
        <h3>Scoreboard!</h3>
        <i class="fa-solid fa-xmark"></i>
        <p>So far you have guessed the Pokemon in these amount of times:</p>
        <ul>
            <li>1 Try: ${pokemonApp.stats.tries1} </li>
            <li>2 Tries: ${pokemonApp.stats.tries2}</li>
            <li>3 Tries: ${pokemonApp.stats.tries3}</li>
            <li>4 Tries: ${pokemonApp.stats.tries4}</li>
            <li>5 Tries: ${pokemonApp.stats.tries5}</li>
            <li>6 Tries: ${pokemonApp.stats.tries6}</li>
            <li>Total Tries: ${pokemonApp.stats.totalGuesses} </li>
            <li>Games Played: ${pokemonApp.stats.totalGames} </li>
            <li>Correct Pokemons: ${pokemonApp.stats.totalCorrect} </li>
        </ul>
    `;
    return scoreboardDisplayDivElement;
};

// create a method to display the scoreboard
pokemonApp.displayScoreboard = () => {
    // if ((document.querySelector('#scoreboardDisplay')) && (i > 0)) {
    //     // console.log('take me AWAY!');
    //     const divId = document.querySelector('main').querySelector('#scoreboardDisplay');

    //     // if the scoreboardDisplay ID is there remove the child
    //     document.querySelector('main').removeChild(divId);

    // } else if (!document.querySelector('#scoreboardDisplay') && (i >= 0)) {
    //     // if the scoreboardDisplay ID is not there, append it!
    //     document.querySelector('main').append(pokemonApp.scoreboardDisplay());
    // };

    // if scoreboard is not there, append
    if (!document.querySelector('#scoreboardDisplay')) {
        document.querySelector('main').append(pokemonApp.scoreboardDisplay());
    // else if scoreboard is there, rmove
    } else if (document.querySelector('#scoreboardDisplay')) {
        document.querySelector('main').removeChild(document.querySelector('#scoreboardDisplay'));
    };

};

// create a method that will append or remove the helpTab
pokemonApp.help = () => {
    // if helpTab is no there append
    if (!document.querySelector('.helpTab')) {
        document.querySelector('main').appendChild(pokemonApp.helpTab());
        // else if helpTab is there remove
    } else if (document.querySelector('.helpTab')) {
        document.querySelector('main').removeChild(document.querySelector('.helpTab'));
    };
};

// create a method which sets up all of the event listeners within this app
pokemonApp.eventListenerSetUp = () => {

    // event listener for when the scoreboard icon is clicked to display score
    document.querySelector('.fa-chart-line').addEventListener('click', () => {
        pokemonApp.displayScoreboard();
    })

    // event listener for when the ? is clicked to display rules
    document.querySelector('.fa-question').addEventListener('click', (e) => {
        pokemonApp.help();
    });

    // event listerner to close th helpTab when you click anyhere on the page except the helpTab itself
    document.querySelector('html').addEventListener('click', (e) => {
        // all conditions of the helpTab except for the x icon
        if (e.target === document.querySelector('.fa-question') || e.target === document.getElementById('help') || e.target == document.querySelector(".helpTab") || e.target.matches('.helpTab p') || e.target.matches('.helpTab p span') || e.target == document.querySelector('.helpTab h3')) {
            //do nothing
        // else remove the helpTab
        } else if (document.querySelector('.helpTab')) {
            document.querySelector('main').removeChild(document.querySelector('.helpTab'))
        };
        // if (document.querySelector('.helpTab')) {
        //     while ( e.target != document.querySelector('.helpTab')) {
        //         console.log(e.target);
        //         document.querySelector('main').removeChild(document.querySelector('.helpTab'))
        //     }
        // }
    })

    // event listener to close the scoreboard when yo click anywher on the page except the scoreboard itself
    document.querySelector('html').addEventListener('click', (e) => {
        // all conditions of the scoreboard except for the x icon
        if (e.target == document.querySelector('.fa-chart-line') || e.target == document.querySelector(".scoreboardDisplay") || e.target == document.querySelector('.scoreboardDisplay h3') || e.target == document.querySelector('.scoreboardDisplay p') || e.target.matches('.scoreboardDisplay ul') || e.target.matches('.scoreboardDisplay li')) {
            //do nothing
        }
        // else remove the scoreboard
        else if (document.querySelector('.scoreboardDisplay')) {
            document.querySelector('main').removeChild(document.querySelector('.scoreboardDisplay'))
        }
    })

    // event listener when play again is clicked
    document.querySelector('main').addEventListener('click', (e) => {
        if (e.target.className === "playAgain") {
            document.querySelector('main div').removeChild(document.querySelector('.answerTab'));
            pokemonApp.playAgain();
        }
    });

    // event listener for when keys are pressed
    document.addEventListener('keydown', (e) => {
        // play again upon hitting enter key on answerTab
        if (document.querySelector('.answerTab') && e.code == "Enter") {
            document.querySelector('main div').removeChild(document.querySelector('.answerTab'));
            pokemonApp.playAgain();
        };

        // remove helpTab upon esc key
        if (document.querySelector('.helpTab') && e.code == "Escape") {
            document.querySelector('main').removeChild(document.querySelector('.helpTab'));
        };

        // remove scoreboard upon esc key
        if (document.querySelector('#scoreboardDisplay') && e.code == "Escape") {
            document.querySelector('main').removeChild(document.querySelector('#scoreboardDisplay'));
        };
    });

    // added an event listener for when the submit button is pressed and increase the amount of guesses,
        // compare user input to displayed pokemon and append user input to list
    document.forms["userGuess"].addEventListener('submit', (e) => {
        e.preventDefault();
        const userInput = document.querySelector('#guess');
        // VALIDATION - user input has to:
            // have a value 
            // no more than 10 characters long userInput.value.length < 11
            // no special characters or numbers 
        if (userInput.value && /^[a-zA-Z]+$/.test(userInput.value)){
            // added an if statement to only allow the user to guess if guesses < 6
            if ( pokemonApp.numberOfGuesses < 6) {
                // tracking the user input of the pokemon name guess
                console.log(userInput.value.toLowerCase());
                
                // add value to the object of totalGuesses.
                pokemonApp.stats.totalGuesses++;

                // creating an array for the user guess
                const userInputArray = userInput.value.toLowerCase().split("");
                
                // creating a variable to display the users guess
                let userGuessDisplay = document.createElement("p");
                userGuessDisplay.classList.add(".slide-in-right");

                // adding a text of 1) , 2) etc.
                userGuessDisplay.textContent = `${pokemonApp.numberOfGuesses + 1}) `;

                // creating a for loop to compare the letters in the user input and pokemon name array and decide if the colour should be green, yellow, or black.
                for (let i = 0; i < userInputArray.length; i++) {
                    // console.log(userInputArray[i]);
                    // create a span element
                    const span = document.createElement('span');

                    // check variable to check if the letter is included in the string "pokemonName"
                    const check = pokemonApp.pokemonName.includes(userInputArray[i]);
                    // console.log(check);

                    // check to see if the letter[i] matches with the letter[i] for both arrays.  If so give it a class of correctPosition.
                    if (userInputArray[i] === pokemonApp.pokemonNameArray[i]){
                        // console.log('got one Right!');

                        //give a variable of correctPosition to hold the letter
                        const correctPosition = `${userInputArray[i]}`;

                        // add a class of correctPosition
                        span.classList.add('correctPosition');

                        // give a value of the innertext
                        span.innerText = `${userInputArray[i]}`;

                        // append child span to the paragraph tag "userGuessDisplay"
                        userGuessDisplay.appendChild(span);

                    // check to see if the check variable is true.  If so, give it a class of correctLetter. 
                    } else if (check === true){

                        const correctLetter = userInputArray[i]
                        span.classList.add('correctLetter');
                        span.innerText = `${userInputArray[i]}`
                        userGuessDisplay.appendChild(span);

                    } else {
                        span.innerText = `${userInputArray[i]}`
                        userGuessDisplay.appendChild(span);
                    };
                };

                // append the userGuessDisplay (p tag) to the rightpanel.
                document.querySelector('.rightPanel .textContainer').appendChild(userGuessDisplay);

                if ( pokemonApp.chosenPokemonName === userInput.value.toLowerCase()) {

                    document.querySelector('.rightPanel .textContainer').innerHTML = "";

                        pokemonApp.stats.totalCorrect++;

                    // run function scoreboard to keep track of the guess they got correct
                    pokemonApp.scoreboard(pokemonApp.numberOfGuesses + 1);

                    pokemonApp.numberOfGuesses = 6;
                    pokemonApp.answerTab();

                } else if (pokemonApp.numberOfGuesses < 5) {
                    pokemonApp.numberOfGuesses = pokemonApp.numberOfGuesses + 1;

                    // removes 1/5 of the rings from the canvas by clearing the canvas first then redrawing less rings
                    let newTotalRings = pokemonApp.totalRings - pokemonApp.totalRings / 5 * pokemonApp.numberOfGuesses
                    pokemonApp.canvas.clearRect(0, 0, 300, 150);
                    for (let i = 0; i < newTotalRings; i++){
                        pokemonApp.drawRing(pokemonApp.ringLocation[i].x, pokemonApp.ringLocation[i].y, pokemonApp.ringLocation[i].color)
                    };

                } else if ( pokemonApp.numberOfGuesses === 5) {
                    // document.querySelector('.rightPanel').querySelector('p').appendChild(userGuessDisplay);
                    document.querySelector('.rightPanel .textContainer').innerHTML = "";
                    pokemonApp.numberOfGuesses = pokemonApp.numberOfGuesses + 1;
                    pokemonApp.answerTab();
                };

                userInput.placeholder = "Guess your Pokemon";
                userInput.value = "";
            };
        // add animation and change placeholder when user input invalid word
        } else if (userInput.value && !/^[a-zA-Z]+$/.test(userInput.value)) {
            userInput.classList.add('flicker')

            userInput.placeholder = "Only letters"
            userInput.value = "";

            // remove flicker class after 0.5s
            setTimeout( () => {
                userInput.classList.remove('flicker');
            }, 500);
        };
    });

    // event listener for the difficulty
    const difficulty = document.forms["options"].elements["difficulty"];
    console.log(difficulty);
    // this prevents the checked difficulty from changing after user guess
    let defaultIndex = 1;
    difficulty[defaultIndex].checked = true;
    difficulty.forEach( (level) => {
        level.addEventListener('click', (e) => {
            // only allow to change difficulty at the start of a new round
            if (document.querySelector('.rightPanel .textContainer').childElementCount == 0) {
                if (level.id == "none") {
                    console.log("This level has no difficulty");
                    defaultIndex = 0;
                    console.log(defaultIndex);
                    pokemonApp.totalRings = 0;
                    pokemonApp.blur = 0;
                    pokemonApp.playAgain();
                } else if (level.id == "easy") {
                    console.log("This level is easy");
                    defaultIndex = 1;
                    console.log(defaultIndex);
                    pokemonApp.totalRings = 40;
                    pokemonApp.blur = 0;
                    pokemonApp.playAgain();
                } else if (level.id == "medium") {
                    console.log("This level is medium");
                    defaultIndex = 2;
                    console.log(defaultIndex);
                    pokemonApp.totalRings = 50;
                    pokemonApp.blur = 10;
                    pokemonApp.playAgain();
                } else if (level.id == "hard") {
                    console.log("This level is hard");
                    defaultIndex = 3;
                    console.log(defaultIndex);
                    pokemonApp.totalRings = 80;
                    pokemonApp.blur = 20;
                    pokemonApp.playAgain();
                }
            } else {
                console.log(defaultIndex);
                difficulty[defaultIndex].checked = true;
            }
        })
    });
};

pokemonApp.playAgain = () => {
    // clear canvas
    pokemonApp.canvas.clearRect(0, 0, 300, 150);
    pokemonApp.randomPokemon();
};

//create a method that will display the chosen pokemon's picture and name upon 
pokemonApp.answerTab = () => {

    const sectionElement = document.createElement('section');
    sectionElement.classList.add('answerTab', 'flexContainer');

    // create div to hold the pokemon img
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('imgContainer')
    const imgElement = document.createElement('img');
    console.log(pokemonApp.chosenPokemonPicture);
    imgElement.src = pokemonApp.chosenPokemonPicture;

    // append to section
    sectionElement.appendChild(imgDiv).appendChild(imgElement);
    
    // create div to hold the pokemon name
    const textDiv = document.createElement('div');
    textDiv.classList.add('textContainer', 'flexContainer');
    const playAgainDiv = document.createElement('div');
    const textElement = document.createElement('h2');
    textElement.textContent = pokemonApp.chosenPokemonName;
    
    // create a button for play again and text
    const buttonParagraghElement = document.createElement('p');
    const buttonElement = document.createElement('button');
    const imgButtonElement = document.createElement('img');
    buttonElement.classList.add('playAgain', 'pulsate-bck');
    buttonElement.id = 'playAgain';
    buttonParagraghElement.innerHTML = "Play Again";
    // console.log(buttonElement);
    // console.log(document.querySelector('main button'));
    imgButtonElement.src = "./assets/pokemon-go.png";
    imgButtonElement.classList.add('playAgain');
    console.log(imgButtonElement);
    
    buttonElement.appendChild(imgButtonElement);
    playAgainDiv.append(buttonParagraghElement, buttonElement);
    
    // buttonElement.textContent = "Play again";
    
    // append to section
    sectionElement.appendChild(textDiv).append(textElement, playAgainDiv);
    
    //append sectin to main
    document.querySelector('main .wrapper').append(sectionElement);
};

// Call the init method
pokemonApp.init();
