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
    pokemonApp.help(document.getElementById('help').checked);
    pokemonApp.eventListenerSetUp();

}

// Create a method which will request information for the API (pokemonApp.getPokemon)
pokemonApp.getPokemon = () => {
    pokemonApp.colourRings()
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

        // // check for names that does not ONLY include regular letters
        // console.log(jsonResponse.results);
        // jsonResponse.results.forEach( (pokemon) => {
        //     if (!/^[a-zA-Z]+$/.test(pokemon.name)) {
        //         console.log(pokemon.name);
        //     }
        // }) 

        
        let longestName = ""
        jsonResponse.results.forEach( (pokemon) => {
            if (pokemon.name.length > longestName.length) {
                longestName = pokemon.name;
            }
        }) 
        console.log(`${longestName} is the longest character name with ${longestName.length}`);
        
        let numOfPokemon = 0;
        let charLength = 0;
        let numOfCharLength = {};
        for (let index = 1; index <= longestName.length; index++) {
            numOfCharLength[index] = 0;
        };
        jsonResponse.results.forEach( (pokemon) => {
            while (charLength <= longestName.length) {
                // console.log(charLength);
                // console.log(longestName.length);
                if (pokemon.name.length == charLength) {
                    // console.log(pokemon.name.length);
                    numOfPokemon++;
                    console.log(numOfPokemon, pokemon.name, pokemon.name.length);
                    numOfCharLength[charLength] = numOfCharLength[charLength] + 1;
                }

                charLength++;
            }
            charLength = 0;
        }) 
        console.log(numOfCharLength);
    })

};

// Build a method that will grab the URL of the random pokemon (pokemonApp.randomPokemon)
pokemonApp.randomPokemon = (datafromApi) => {
    // do while loop to only choose pokemons that contains only letters
    do {
        // creating a variable to choose a random pokemon
        randomIndex = Math.floor(Math.random() * pokemonApp.limit);

        // Calling the array with the random number given to find the pokemon
        randomPokemonUrl = datafromApi.results[randomIndex].url;}
    while (!/^[a-zA-Z]+$/.test(datafromApi.results[randomIndex].name) == true);

    fetch(randomPokemonUrl)
    .then (function(aResponse) {
        return aResponse.json()
    })
    .then (function(jResponse) {
        pokemonApp.chosenPokemon(jResponse);
        
    })
}

// Build a method that will display the picture of the chosen pokemon and append it (pokemonApp.chosenPokemon)
pokemonApp.chosenPokemon = (dataFromRandomPokemon) => {
    // console.log(dataFromRandomPokemon);
    // create variable to hold picture URL given from pokeAPI.co
    pokemonApp.chosenPokemonPicture = dataFromRandomPokemon.sprites.other['official-artwork']['front_default'];

    pokemonApp.chosenPokemonName = dataFromRandomPokemon.name;


    // look for the img
    // const img = document.createElement('img')

    // img.src = chosenPokemonPicture;

    // console.log(document.querySelector('.leftPanel img').src)
    document.querySelector('.leftPanel img').src = pokemonApp.chosenPokemonPicture
    // document.querySelector('.leftPanel').children[0].appendChild(img);
    // Build a method that will compare user input to displayed pokemon and append user input to list (pokemonApp.checkAnswer)

    // adding a variable to keep track of guesses
    let numberOfGuesses = 0;

    // adding a variable to store name of pokemon
    const pokemonName = dataFromRandomPokemon.name.toLowerCase();
    // console.log(pokemonName);

    // adding an array for the random pokemon chosen
    const pokemonNameArray = pokemonName.split("");

    // const pokemonNameArray = pokemonName.map((eachLetter) => {
    //     // return 
    // });
    

    // function pokemonLetters (item, index) {
        
    // }
    // console.log(pokemonNameArray);

    // added an event listener for when the submit button is pressed and increase the amount of guesses

        document.querySelector('.submit').addEventListener('click', () => {
            // added an if statement to only allow the user to guess if guesses < 6
            if ( numberOfGuesses < 6) {
                // tracking the user input of the pokemon name guess
                const userInput = document.querySelector('#guess');
                console.log(userInput.value.toLowerCase());
                
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
                    numberOfGuesses = 6;
                    pokemonApp.answerTab();
    
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
                    pokemonApp.answerTab();
                }

            }


        });
    
}


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


// create a method that will open up a "how to play" tab
// create a method that creates the helpTab
pokemonApp.helpTab = () => {
    helpTabDivElement = document.createElement('div');
    helpTabDivElement.classList.add('helpTab')
    // helpTabDivElement.id = 'helpTab'
    helpTabDivElement.innerHTML = `
        <p>Guess that Pokemon in six tries.</p>
        <p>Hit the enter button or click the pokeball to submit.</p>
        <p>After each guess, the number of rings decrease.</p>
        <p>Also after each guess, the colour of the letters will change to show how close your guess was to the Pokemon.</p>
        <p><span class="greenWord">Green</span>: The letter is in the word and in the correct spot.</p>
        <p><span class="yellowWord">Yellow</span>: The letter is in the word but in the wrong spot.</p>
    `;
    return helpTabDivElement
}

// create a method that will append or remove the helpTab
pokemonApp.help = () => {
    if (!document.querySelector('.helpTab')) {
        //if help is check append
        document.querySelector('main').appendChild(pokemonApp.helpTab());
    } else if (document.querySelector('.helpTab')) {
        // else remove the helpTab
        document.querySelector('main').removeChild(document.querySelector('.helpTab'))
    };
};

// create a method which sets up all of the event listeners within this app
pokemonApp.eventListenerSetUp = () => {
    // event listener for when the ? is clicked 
    document.querySelector('.fa-question').addEventListener('click', () => {
        // console.log("eventlistener status: ", document.getElementById('help').checked);
        pokemonApp.help();
        // console.log('--------');
    });
    
    //event listerner to close th helpTab when you click anyhere on the page
    document.querySelector('html').addEventListener('click', (e) => {
        //except when you click on the ? again
        if (e.target === document.querySelector('.fa-question') || e.target === document.getElementById('help')) {
            return;
        } else if (document.querySelector('.helpTab')) {
            // else remove the helpTab
            document.querySelector('main').removeChild(document.querySelector('.helpTab'))
        };
    })

    // event listener when play again is clicked
    document.querySelector('main').addEventListener('click', (e) => {
        if (e.target.className === "playAgain") {
            document.querySelector('main div').removeChild(document.querySelector('.answerTab'));
        pokemonApp.playAgain();
        }
    });
};

//create a method that holds a play again feature
pokemonApp.playAgain = () => {
    // clear canvas
    pokemonApp.canvas.clearRect(0, 0, 300, 150);
    pokemonApp.getPokemon();
};


//create a method that will display the chosen pokemon's picture and name upon 
pokemonApp.answerTab = () => {

    const sectionElement = document.createElement('section');
    sectionElement.classList.add('answerTab', 'flexContainer');

    // clear the section
    if (document.querySelector('.answerTab')) {
        
    }

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
    const textElement = document.createElement('h2');
    textElement.textContent = pokemonApp.chosenPokemonName;

    // create a button for play again
    const buttonElement = document.createElement('button')
    buttonElement.classList.add('playAgain');
    buttonElement.id = 'playAgain';
    console.log(buttonElement);
    console.log(document.querySelector('main button'));
    
    buttonElement.textContent = "Play again";
    

    // append to section
    sectionElement.appendChild(textDiv).append(textElement, buttonElement);

    //append sectin to main
    document.querySelector('main .wrapper').append(sectionElement);
};

// Call the init method
pokemonApp.init();
