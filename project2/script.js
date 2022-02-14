// Create app object (pokemonApp)
const pokemonApp = {};

// creating an apiURL

pokemonApp.apiURL = 'https://pokeapi.co/api/v2/pokemon/';

// Create initialization method (pokemonApp.init)
pokemonApp.init = () => {
    // new variable for amount of pokemon
    pokemonApp.limit = 151;
    pokemonApp.getPokemon();
    pokemonApp.colourRings();
    // document.getElementById('help').checked = 'true';
    // console.log('init check status: ', (document.getElementById('help').checked))
    pokemonApp.help(document.getElementById('help').checked);
    // console.log('init check status: ', (document.getElementById('help').checked))
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






console.log(document.querySelector('.leftPanel').querySelector('.imgContainer'));
console.log(document.querySelector('.leftPanel').querySelector('.imgContainer'));


// Build a method that will display pokemon img and name on a pop up upon correct guess (pokemonApp.correctAnswer)
// Restarts when the user clicks “Play again” (eventListener)
// Build a method that will blur picture with rings
pokemonApp.colourRings = () => {
    // Create a canvas that will live on top of imgContainer
    const canvasElement = document.createElement('canvas');
    canvasElement.classList.add('rings');
    // set the width and height of canvas to match div
    canvasElement.width = 350;
    canvasElement.height = 350;
    // canvasElement.width = document.querySelector('.leftPanel').querySelector('.imgContainer').offsetWidth;
    // canvasElement.height = document.querySelector('.leftPanel').querySelector('.imgContainer').offsetHeight;
    // console.log(canvasElement.style);
    canvasElement.style.position = "absolute";
    Object.assign(canvasElement.style, {
        border: "2px dotted darkgreen",
        // backgroundColor: "rgba(0,255,0,0.2)",
        // backdropFilter: "blur(100px)",
        // backdropFilter: "blur(10px)",
    })
    // backdropFileter not supported in firefox
    // console.log(CSS.supports("backdropFilter: solid"))
    // console.log(CSS.supports("position, relatve"))
    // console.log(CSS.supports("text-decoration-style", "blink"))
    // console.log(CSS.supports("display: flex"))
    // console.log(CSS.supports("text-decoration-style: blink"))
    document.querySelector('.leftPanel').appendChild(canvasElement);

    // create a circle inside the canvasElement
    const canvas = document.querySelector('.rings');
    const ctx = canvas.getContext('2d');
    // console.log(canvasElement.width)

    
    //create a function to creat 50 ring at a random location
    for (let numberOfRings = 0; numberOfRings < 50; numberOfRings++) {
        ctx.beginPath();
        let x = Math.floor(Math.random() * canvasElement.width);
        let y = Math.floor(Math.random() * canvasElement.height);
        let radius = 50;
        let startAngle = 0;
        let endAngle = 2 * Math.PI;
        
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.arc(x, y, radius-15, 0, 2 * Math.PI);
        ctx.fillStyle = pokemonApp.randomColour();
        ctx.fill("evenodd");
    };
}


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
// create a method that returns the helpTab
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

// cerat a method that will append or remove the helpTab
pokemonApp.help = () => {
    // console.log('pokemonApp.help status ', status);
    if (!document.getElementById('helpTab')) {
        //if help is check append
        // console.log("status true");
        document.querySelector('main').appendChild(pokemonApp.helpTab());
        // console.log(helpTab);
    } else if (document.getElementById('helpTab')) {
        // console.log("status false");
        // else remove the helpTab
        document.querySelector('main').removeChild(document.getElementById('helpTab'))
    };
};

// event listener for when the ? is clicked 
document.querySelector('.fa-question').addEventListener('click', () => {
    // console.log("eventlistener status: ", document.getElementById('help').checked);
    pokemonApp.help();
    // console.log('--------');
});

//event listerner to close th helpTab when you click anyhere on the page
document.querySelector('html').addEventListener('click', (e) => {
    // console.log('etarget ', e.target);
    //except when you click on the ? again
    if (e.target === document.querySelector('.fa-question') || e.target === document.getElementById('help')) {
        // console.log('true'); 
        return;
    } else if (document.getElementById('helpTab')) {
        // console.log("status false");
        // else remove the helpTab
        document.querySelector('main').removeChild(document.getElementById('helpTab'))
    };
})

// Call the init method
pokemonApp.init();