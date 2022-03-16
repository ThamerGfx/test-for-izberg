const initState = {
    allDataPokemon : [],
    next: null,
    previous: null,
    pokemonAbilities: [],
    pokemonGameIndices: [],
    pokemonMoves: [],
  }
  
  const pokemonReducer = (state = initState, action) => {
    if (action.type === "GET_ALL_POKEMON_SUCCESS"){
      return {
        ...state,
        allDataPokemon: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
      }
    }
    if (action.type === "GET_ALL_POKEMON_DETAILS_SUCCESS"){
      return {
        ...state,
        pokemonAbilities: action.payload.abilities,
        pokemonGameIndices: action.payload.game_indices,
        pokemonMoves: action.payload.moves,
      }
    }
    return state
  }
  
  export default pokemonReducer;