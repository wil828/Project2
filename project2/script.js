// Create app object (pokemonApp)
const pokemonApp = {};

// creating an apiURL

pokemonApp.apiURL = 'https://pokeapi.co/api/v2/pokemon/';

// Create initialization method (pokemonApp.init)
pokemonApp.init = () => {
    // new variable for amount of pokemon
    pokemonApp.limit = 151;
    pokemonApp.getPokemon();
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
        console.log(jsonResponse);
        pokemonApp.randomPokemon(jsonResponse);
    })

};

// Build a method that will grab the URL of the random pokemon (pokemonApp.randomPokemon)

pokemonApp.randomPokemon = (datafromApi) => {
    // creating a variable to choose a random pokemon
    const randomIndex = Math.floor(Math.random() * pokemonApp.limit);
    console.log(randomIndex);
    
    // Calling the array with the random number given to find the pokemon
    const randomPokemonUrl = datafromApi.results[randomIndex].url;
    // const randomPokemonPic = randomPokemonData.sprites.other."official-artwork"."front_default";
    // console.log(randomPokemonPic);
    console.log(randomPokemonUrl);
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
    console.log(dataFromRandomPokemon);
    // create variable to hold picture URL given from pokeAPI.co
    const chosenPokemonPicture = dataFromRandomPokemon.sprites.other['official-artwork']['front_default'];
    console.log(chosenPokemonPicture);

    // look for the img
    const img = document.querySelector('.leftPanel').children[0].children[0];
    img.src = chosenPokemonPicture;
    img.style.filter = 'blur(8px)';
    // console.log(img);
    
    // Build a method that will compare user input to displayed pokemon and append user input to list (pokemonApp.checkAnswer)
    // added an event listener for when the submit button is pressed
    document.querySelector('.submit').addEventListener('click', () => {
        // tracking the user input of the pokemon name guess
        const userInput = document.querySelector('#guess');
        // console.log(userInput);
        console.log(dataFromRandomPokemon.name);
        console.log(userInput.value.toLowerCase());
        if ( dataFromRandomPokemon.name === userInput.value.toLowerCase()) {
            document.querySelector('.rightPanel').querySelector('p').innerText = "you win!";
        } else
            document.querySelector('.rightPanel').querySelector('p').innerText = "That is wrong.  Please try again!";
    });
}








// Build a method that will display pokemon img and name on a pop up upon correct guess (pokemonApp.correctAnswer)
// Restarts when the user clicks “Play again” (eventListener)


// Call the init method
pokemonApp.init();



test 