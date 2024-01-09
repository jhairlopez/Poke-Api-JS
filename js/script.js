const listaPokemon = document.querySelector('#listaPomenon');
const boton = document.querySelectorAll('.btn-header');
let api = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 0; i <= 151; i++){
    fetch(api + i)
    .then((response) => response.json())
    .then((data => mostrarPokemon(data)))
}

function mostrarPokemon(poke){

    let tipos = poke.types.map( (type) => 
        `<p class="${type.type.name} tipo">${type.type.name}</p>`
        );
   tipos = tipos.join('');
    const div = document.createElement('div');
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="pokemon">
    <p class="pokemon-id-back">#${poke.id}</p>
    <div class="pokemon-img">
    <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">g
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${poke.id}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
    
    <div class="pokemon-tipos">
       ${tipos}
    </div>
    <div class="pokemon-stats">
        <p class="stat">${poke.height}m</p>
        <p class="stat">${poke.weight}KG</p>
    </div>
    </div>
    </div>
    `;
    listaPokemon.append(div);
}


boton.forEach(btn => btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id; 
    listaPokemon.innerHTML = "";
    
    for (let i = 0; i <= 151; i++){
        fetch(api + i)
        .then((response) => response.json())
        .then(data => { 
            
            
            if(btnId === "ver-todos"){
                mostrarPokemon(data);
            } else {
                const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo  => tipo.includes(btnId))){
                    mostrarPokemon(data);
            }
        }
    })
}
}))

