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

    // added an event listener for when the submit button is pressed and increase the amount of guesses

        document.querySelector('.submit').addEventListener('click', () => {
            // added an if statement to only allow the user to guess if guesses < 6
            if ( numberOfGuesses < 6) {
                // tracking the user input of the pokemon name guess
                const userInput = document.querySelector('#guess');

                // creating a variable to display the users guess
                let userGuessDisplay = document.createElement("p");
                userGuessDisplay.textContent = `${numberOfGuesses+1}) ${userInput.value.toLowerCase()}`;
                document.querySelector('.rightPanel').querySelector('p').appendChild(userGuessDisplay);

                // let userFinalResult = document.createElement("p");
                // userFinalResult.textContent = 

                // console.log(userInput);
                // console.log(dataFromRandomPokemon.name);
                // console.log(userInput.value.toLowerCase());
    
                if ( dataFromRandomPokemon.name === userInput.value.toLowerCase()) {
                    document.querySelector('.rightPanel').querySelector('p').appendChild(userGuessDisplay);

                    document.querySelector('.rightPanel').querySelector('p').innerText = "you win!";
                    numberOfGuesses = 6;

    
                } else if (numberOfGuesses < 5) {
                    numberOfGuesses = numberOfGuesses + 1;
                    // document.querySelector('.rightPanel').querySelector('p').innerText = "That is wrong.  Please try again!";
                    console.log(numberOfGuesses);
                    // removes 1/5 of the rings from the canvas by clearing the canvas first then redrawing less rings
                    let newTotalRings = pokemonApp.totalRings - pokemonApp.totalRings / 5 * numberOfGuesses
                    pokemonApp.canvas.clearRect(0, 0, 300, 150);
                    for (let i = 0; i < newTotalRings; i++){
                        pokemonApp.drawRing(pokemonApp.ringLocation[i].x, pokemonApp.ringLocation[i].y, pokemonApp.ringLocation[i].color)
                    }
    
                } else if ( numberOfGuesses === 5) {
                    document.querySelector('.rightPanel').querySelector('p').appendChild(userGuessDisplay);
                    document.querySelector('.rightPanel').querySelector('p').innerText = "You aren't a pokemon master.";
                    numberOfGuesses = numberOfGuesses + 1;
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
        } else if (document.getElementById('helpTab')) {
            // else remove the helpTab
            document.querySelector('main').removeChild(document.getElementById('helpTab'))
        };
    })
    
}


// Call the init method
pokemonApp.init();
