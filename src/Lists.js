import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

// IMPORT ELEMENTS
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

// IMPORT ACTIONS
import { getAllPokemon, getAllPokemonDetails } from "./store/actions";
import { Button } from "@mui/material";
import ListItemsDetails from "./components/ListItemsDetails";
import ListItems from "./components/ListItems";
import ListItemsFav from "./components/ListItemsFav";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Lists() {
  const pokemonReducer = useSelector((state) => state.pokemonReducer);
  const {
    allDataPokemon,
    next,
    previous,
    pokemonAbilities,
    pokemonGameIndices,
    pokemonMoves,
  } = pokemonReducer;

  const dispatch = useDispatch();

  const [url, setUrl] = React.useState("https://pokeapi.co/api/v2/pokemon");
  const [fav, setFav] = React.useState([]);
  const [favTable, setFavTable] = React.useState([]);
  const [openDetails, setOpenDetails] = React.useState(false);

  const handleClickNext = () => {
    setUrl(next);
  };

  const handleClickPrevious = () => {
    setUrl(previous);
  };

  const handleClickDetails = (detail) => {
    dispatch(getAllPokemonDetails(detail));
    setOpenDetails(true);
  };

  const handleClickFav = (item) => {
    const res = fav.find((element) => element === item.name);
    if (res === undefined) {
      setFav([...fav, item.name]);
    }
    localStorage.setItem("favorites", fav);
    setFavTable(localStorage.getItem("favorites").split(","));
  };

  const handleClickDeleteFav = () => {
    localStorage.removeItem("favorites");
    setFavTable([]);
  };

  React.useEffect(() => {
    if (localStorage.getItem("favorites") !== null) {
      setFavTable(localStorage.getItem("favorites").split(","));
    }
    dispatch(getAllPokemon(url));
  }, [dispatch, url]);

  return (
    <div>
      <React.Fragment>
        <Button variant="contained" size="small" onClick={handleClickNext}>
          Next
        </Button>
        <CssBaseline />
        {previous !== null ? (
          <Button variant="outlined" size="small" onClick={handleClickPrevious}>
            Previous
          </Button>
        ) : null}
        <Container fixed>
          <Box sx={{ height: "180%" }}>
            <Box
              sx={{
                width: "80%",
                height: "100%",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={8}>
                    <ListItems
                      allDataPokemon={allDataPokemon}
                      handleClickDetails={handleClickDetails}
                      handleClickFav={handleClickFav}
                    />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Grid container spacing={1}>
                      {openDetails ? (
                        <ListItemsDetails
                          pokemonAbilities={pokemonAbilities}
                          pokemonGameIndices={pokemonGameIndices}
                          pokemonMoves={pokemonMoves}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Item>
                  <ListItemsFav
                    favTable={favTable}
                    handleClickDeleteFav={handleClickDeleteFav}
                  />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}
