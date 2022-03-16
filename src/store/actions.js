export const getAllPokemon = (url) => {
  return (dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_ALL_POKEMON_SUCCESS",
          payload: res,
        });
        return res;
      })
      .catch((err) => console.log("error fetching pokemon: ", err));
  };
};
export const getAllPokemonDetails = (url) => {
  return (dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_ALL_POKEMON_DETAILS_SUCCESS",
          payload: res,
        });
        return res;
      })
      .catch((err) => console.log("error fetching pokemon: ", err));
  };
};
