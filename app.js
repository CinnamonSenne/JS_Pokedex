const pokedex = document.getElementById("pokedex");
var search_input = document.querySelector("#search")

const fetchPokemon = () => {

    const promises = [];
    for (let i = 1; i < 800; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then( res => res.json()));
    }
        Promise.all(promises).then( results => {
            const pokemon = results.map( data => ({
                    name: data.name,
                    id: data.id,
                    image: data.sprites['front_default'],
                    type: data.types.map((type) => type.type.name).join(", ")           
            }));
            displayPokemon(pokemon);
        })
}

const displayPokemon= (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map (pokeman => `
    <li class="card">
        <a class="card-image" href="https://bulbapedia.bulbagarden.net/wiki/${pokeman.name}_(Pok%C3%A9mon)">
        <img class="card-image" src="${pokeman.image}"/>
        </a>
        <h2 class="card-title" id="pokemon-name">${pokeman.name}</h2>
        <p class="card-subtitle">${pokeman.type}</p>
    </li>
    `)
    .join("")
    pokedex.innerHTML = pokemonHTMLString;
}


function Search() {
    search_input.addEventListener("keyup", function(e) {
        var search_item = e.target.value.toLowerCase();
        var pokemon_names = document.querySelectorAll(".card-title");

        pokemon_names.forEach(function(item) {
            if (item.textContent.toLowerCase().indexOf(search_item) != -1) {
                item.closest("li").style.display = "grid";
            }
            else {
                item.closest("li").style.display = "none";
            }
        })
    })
}

fetchPokemon();
Search();