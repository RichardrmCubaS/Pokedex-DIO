/* Programa Principal do Pokedex */
/* main.js */

/* declaração de variaveis e const */
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 5
let offset = 0;

/* Função de conversão de Js para Html */
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
                 <li class = "pokemon ${pokemon.type}">   
                     <span class = "number">#${pokemon.number}</span>
                     <span class = "name">${pokemon.name}</span>                     
                     <div class = "detail">
                          <ul class = "types">
                              ${pokemon.types.map((type) => `<li class = "type ${type}">${type}</li>`).join('')}                       
                          </ul>                        
                          <img src="${pokemon.photo}"     
                               alt="${pokemon.name}">
                          <ol class = "stats">
                               ${pokemon.stats.map((stat) => `<li class = "stat ${stat}">${stat}</li>`).join('')}                                                    
                          </ol>
                     </div>              
                 </li>
            `).join('')

        pokemonList.innerHTML += newHtml
    })
}

/* Funçao que cargar lista de Pokemons*/
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})