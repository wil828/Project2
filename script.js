// Create app object (pokemonApp)
const pokemonApp = {};

// creating an apiURL

pokemonApp.apiURL = 'https://pokeapi.co/api/v2/pokemon/';

// Create initialization method (pokemonApp.init)
pokemonApp.init = () => {
    // new variable for amount of pokemon
    pokemonApp.limit = 151;
    pokemonApp.totalRings = 50;
    pokemonApp.getPokemon();
    pokemonApp.colourRings();
    pokemonApp.help(document.getElementById('help').checked);
    pokemonApp.eventListenerSetUp();
    
}

// Create a method which will request information for the API (pokemonApp.getPokemon)
pokemonApp.getPokemon = () => {

    const url = new URL(pokemonApp.apiURL);
    url.search = new URLSearchParams({
        limit : pokemonApp.limit,
        // offset : '40'
    });
    // console.log(url);
    fetch(url)
    .then (function(apiResponse) {
        return apiResponse.json()
    })
    
    .then (function(jsonResponse) {
        // console.log(jsonResponse);
        pokemonApp.randomPokemon(jsonResponse);
    })

};

// Build a method that will grab the URL of the random pokemon (pokemonApp.randomPokemon)

pokemonApp.randomPokemon = (datafromApi) => {
    // creating a variable to choose a random pokemon
    const randomIndex = Math.floor(Math.random() * pokemonApp.limit);
    // console.log(randomIndex);
    
    // Calling the array with the random number given to find the pokemon
    const randomPokemonUrl = datafromApi.results[randomIndex].url;
    // const randomPokemonPic = randomPokemonData.sprites.other."official-artwork"."front_default";
    // console.log(randomPokemonPic);
    // console.log(randomPokemonUrl);
    fetch(randomPokemonUrl)
    .then (function(aResponse) {
        return aResponse.json()
    })
    
    .then (function(jResponse) {
        // console.log(jResponse);
        pokemonApp.chosenPokemon(jResponse);
        
    })
}

// Build a method that will display the picture of the chosen pokemon and append it (pokemonApp.chosenPokemon)
pokemonApp.chosenPokemon = (dataFromRandomPokemon) => {
    // console.log(dataFromRandomPokemon);
    // create variable to hold picture URL given from pokeAPI.co
    const chosenPokemonPicture = dataFromRandomPokemon.sprites.other['official-artwork']['front_default'];
    // console.log(chosenPokemonPicture);

    // look for the img
    const img = document.createElement('img')

    img.src = chosenPokemonPicture;
    // img.style.filter = 'blur(8px)';
    // console.log(img);
    document.querySelector('.leftPanel').children[0].appendChild(img);
    // Build a method that will compare user input to displayed pokemon and append user input to list (pokemonApp.checkAnswer)

    // adding a variable to keep track of guesses
    let numberOfGuesses = 0;

    // adding a variable to store name of pokemon
    const pokemonName = dataFromRandomPokemon.name.toLowerCase();
    console.log(pokemonName);

    // adding an array for the random pokemon chosen
    const pokemonNameArray = pokemonName.split("");

    // added an event listener for when the submit button is pressed and increase the amount of guesses


    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        
        // added an if statement to only allow the user to guess if guesses < 6
        if ( numberOfGuesses < 6) {
            // tracking the user input of the pokemon name guess
            const userInput = document.querySelector('#guess');
            console.log(userInput.value.toLowerCase());

            // add value to the object of totalGuesses.
            pokemonApp.stats.totalGuesses++;
            
            // creating an array for the user guess
            const userInputArray = userInput.value.toLowerCase().split("");
            // console.log(userInputArray);
            // console.log(userInputArray.length);
            
            // creating a variable to display the users guess
            let userGuessDisplay = document.createElement("p");

            // adding a text of 1) , 2) etc.
            userGuessDisplay.textContent = `${numberOfGuesses + 1}) `;

            // creating a for loop to compare the letters in the user input and pokemon name array and decide if the colour should be green, yellow, or black.
            for (let i = 0; i < userInputArray.length; i++) {
                // console.log(userInputArray[i]);
                // create a span element
                const span = document.createElement('span');

                // check variable to check if the letter is included in the string "pokemonName"
                const check = pokemonName.includes(userInputArray[i]);
                // console.log(check);

                // check to see if the letter[i] matches with the letter[i] for both arrays.  If so give it a class of greenWord.
                if (userInputArray[i] === pokemonNameArray[i]){
                    // console.log('got one Right!');

                    //give a variable of greenWord to hold the letter
                    const greenWord = `${userInputArray[i]}`;

                    // add a class of greenWord
                    span.classList.add('greenWord');

                    // give a value of the innertext
                    span.innerText = `${userInputArray[i]}`

                    // append child span to the paragraph tag "userGuessDisplay"
                    userGuessDisplay.appendChild(span);
                    // console.log(span);
                    // console.log(greenWord);
                    

                // check to see if the check variable is true.  If so, give it a class of yellowWord. 
                } else if (check === true){
                    // console.log(check);

                    const yellowWord = userInputArray[i]
                    span.classList.add('yellowWord');
                    span.innerText = `${userInputArray[i]}`
                    userGuessDisplay.appendChild(span);
                    // console.log(span);
                    // console.log(yellowWord);

                } else {
                    span.innerText = `${userInputArray[i]}`
                    userGuessDisplay.appendChild(span);
                }
            } 
            // console.log(userInputAnswer);
            // append the userGuessDisplay (p tag) to the rightpanel.
            document.querySelector('.rightPanel').querySelector('p').appendChild(userGuessDisplay);


            // console.log(userInput);
            // console.log(dataFromRandomPokemon.name);
            // console.log(userInput.value.toLowerCase());

            if ( dataFromRandomPokemon.name === userInput.value.toLowerCase()) {
                // document.querySelector('.rightPanel').querySelector('p').appendChild(userGuessDisplay);

                document.querySelector('.rightPanel').querySelector('p').innerText = "you win!";

                pokemonApp.stats.totalCorrect++;

                // run function scoreboard to keep track of the guess they got correct
                pokemonApp.scoreboard(numberOfGuesses + 1);

                // added this so the user can't keep clicking 
                numberOfGuesses = 6;

            } else if (numberOfGuesses < 5) {
                numberOfGuesses = numberOfGuesses + 1;
                // document.querySelector('.rightPanel').querySelector('p').innerText = "That is wrong.  Please try again!";

                // removes 1/5 of the rings from the canvas by clearing the canvas first then redrawing less rings
                let newTotalRings = pokemonApp.totalRings - pokemonApp.totalRings / 5 * numberOfGuesses
                pokemonApp.canvas.clearRect(0, 0, 300, 150);
                for (let i = 0; i < newTotalRings; i++){
                    pokemonApp.drawRing(pokemonApp.ringLocation[i].x, pokemonApp.ringLocation[i].y, pokemonApp.ringLocation[i].color)
                }

            } else if ( numberOfGuesses === 5) {
                // document.querySelector('.rightPanel').querySelector('p').appendChild(userGuessDisplay);
                document.querySelector('.rightPanel').querySelector('p').innerText = "You aren't a pokemon master.";
                numberOfGuesses = numberOfGuesses + 1;
            }

            userInput.value = "";
            // console.log(document.querySelector('#guess').value);

        }


    });

}


// Build a method that will display pokemon img and name on a pop up upon correct guess (pokemonApp.correctAnswer)
// Restarts when the user clicks “Play again” (eventListener)

// Create a method that will blur picture with rings
pokemonApp.colourRings = () => {
        // Create a canvas that will live on top of imgContainer
        const canvasElement = document.createElement('canvas');
        canvasElement.classList.add('rings');
        canvasElement.style.position = "absolute";
        document.querySelector('.imgContainer').appendChild(canvasElement);

        // call the to create get 50 ring locations
        pokemonApp.ringLocation();

        // draw the rings on the canva
        for (let i = 0; i < pokemonApp.totalRings; i++){
            pokemonApp.drawRing(pokemonApp.ringLocation[i].x, pokemonApp.ringLocation[i].y, pokemonApp.ringLocation[i].color)
            }
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
}

// create a method that will draw the ring
pokemonApp.drawRing = (x, y, color) => {
    pokemonApp.canvas = document.querySelector('.rings').getContext('2d');
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


// create a method that will open up a "how to play" tab
// create a method that creates the helpTab
pokemonApp.helpTab = () => {
    helpTabDivElement = document.createElement('div');
    helpTabDivElement.classList.add('helpTab')
    helpTabDivElement.id = 'helpTab'
    helpTabDivElement.innerHTML = `
        <p>How to play</p>
        <p>Guess that Pokemon in six tries.</p>
        <p>After each guess, the number of rings decrease.</p>
    `;
    return helpTabDivElement
}

// create a method that will append or remove the helpTab
pokemonApp.help = () => {
    if (!document.getElementById('helpTab')) {
        //if help is check append
        document.querySelector('main').appendChild(pokemonApp.helpTab());
    } else if (document.getElementById('helpTab')) {
        // else remove the helpTab
        document.querySelector('main').removeChild(document.getElementById('helpTab'))
    };
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
    totalCorrect: 0,
}

// console.log(pokemonApp.stats['tries1']);
// console.log(pokemonApp.stats.totalStats());

// create a method to increase the amount of tries and total guesses and correct
pokemonApp.scoreboard = (guessNumber) => {
    pokemonApp.stats[`tries${guessNumber}`]++
    console.log(pokemonApp.stats);
}

// create a method that creates the scoreboard
pokemonApp.scoreboardDisplay = () => {
    scoreboardDisplayDivElement = document.createElement('div');
    scoreboardDisplayDivElement.classList.add('scoreboardDisplay')
    scoreboardDisplayDivElement.id = 'scoreboardDisplay'
    scoreboardDisplayDivElement.innerHTML = `
        <h3>Scoreboard!</h3>
        <p>So far you have guessed the Pokemon in these amount of times:</p>
        <ul>
            <li>1 Try: ${pokemonApp.stats.tries1} </li>
            <li>2 Tries: ${pokemonApp.stats.tries2}</li>
            <li>3 Tries: ${pokemonApp.stats.tries3}</li>
            <li>4 Tries: ${pokemonApp.stats.tries4}</li>
            <li>5 Tries: ${pokemonApp.stats.tries5}</li>
            <li>6 Tries: ${pokemonApp.stats.tries6}</li>
            <li>Total Amount of Tries: ${pokemonApp.stats.totalGuesses} </li>
            <li>Total Amount of Correct Pokemon: ${pokemonApp.stats.totalCorrect} </li>
        </ul>
    `;
    return scoreboardDisplayDivElement
}


// create a method to display the scoreboard
pokemonApp.displayScoreboard = (i) => {
    
    if ((document.querySelector('#scoreboardDisplay')) && (i>0)) {
        // console.log('take me AWAY!');
        const divId = document.querySelector('main').querySelector('#scoreboardDisplay');

        // if the scoreboardDisplay ID is there remove the child
        document.querySelector('main').removeChild(divId);

    } else if (!document.querySelector('#scoreboardDisplay') && (i >= 0)){
        // if the scoreboardDisplay ID is not there, append it!
        document.querySelector('main').append(pokemonApp.scoreboardDisplay());
    };
};



// create a method which sets up all of the event listeners within this app
pokemonApp.eventListenerSetUp = () => {
    // event listener for when the ? is clicked 
    let i = 0;
    document.querySelector('.fa-question').addEventListener('click', () => {
        // console.log("eventlistener status: ", document.getElementById('help').checked);

        pokemonApp.help();
        // console.log('--------');
    });

    document.querySelector('.fa-chart-line').addEventListener('click', () => {
        // console.log('STATISTICS RULE!');
        
        pokemonApp.displayScoreboard(i);
        // added a variable of i so that the scoreboard won't display first time when refreshing.
        i = i + 1;
    })
    
    //event listener to close th helpTab when you click anyhere on the page
    document.querySelector('html').addEventListener('click', (e) => {
        //except when you click on the ? again
        if (e.target === document.querySelector('.fa-question') || e.target === document.getElementById('help')) {
            return;
        } else if (document.getElementById('helpTab')) {
            // else remove the helpTab
            document.querySelector('main').removeChild(document.getElementById('helpTab'))
        };
    })

    document.querySelector('#playAgain').addEventListener('click', () => { 
        pokemonApp.playAgain() 
    });
    
}

//create a method that holds a play again feature
pokemonApp.playAgain = () => {
    pokemonApp.getPokemon()
}

// Call the init method
pokemonApp.init();
