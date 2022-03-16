import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

// IMPORT ELEMENTS
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

// IMPORT ACTIONS
import { getAllPokemon, getAllPokemonDetails } from "./store/actions";

export default function App() {
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

  const handleClickHideDetails = () => {
    setOpenDetails(false);
  };

  React.useEffect(() => {
    if (localStorage.getItem("favorites") !== null) {
      setFavTable(localStorage.getItem("favorites").split(","));
    }
    dispatch(getAllPokemon(url));
  }, [dispatch, url]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              overflow: 'auto',
              bgcolor: "#adadad",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ArrowForwardIosIcon />}
                  onClick={handleClickNext}
                >
                  Next
                </Button>
                {previous !== null ? (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={handleClickPrevious}
                  >
                    Previous
                  </Button>
                ) : null}
                <h2>
                  <b>List Pokemon</b>
                </h2>
              </ListSubheader>
            }
          >
            {allDataPokemon?.map((pok, index) => (
              <>
                <ListItem key={index}>
                  <ListItemText primary={pok.name} />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleClickDetails(pok.url)}
                  >
                    Details
                  </Button>
                  <Fab
                    size="small"
                    color="success"
                    aria-label="add"
                    onClick={() => handleClickFav(pok)}
                  >
                    <AddIcon />
                  </Fab>
                </ListItem>
              </>
            ))}
          </List>
        </Grid>
        <Grid item xs>
          {openDetails ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                bgcolor: "#696969",
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                },
              }}
            >
              <Paper elevation={3}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    "& ul": { padding: 0 },
                  }}
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      <h2>
                        <b>Details Pokemon</b>
                      </h2>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={handleClickHideDetails}
                      >
                        Hide Details
                      </Button>
                    </ListSubheader>
                  }
                >
                  <li>
                    <ul>
                      <ListSubheader>
                        <b>Abilities</b>
                      </ListSubheader>
                      {pokemonAbilities.map((itemAbility, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            style={{ color: "red" }}
                            primary={itemAbility.ability.name}
                          />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <ListSubheader>
                        <b>Game Indices</b>
                      </ListSubheader>
                      {pokemonGameIndices.map((itemGameIndices, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            style={{ color: "green" }}
                            primary={itemGameIndices.version.name}
                          />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <ListSubheader>
                        <b>Moves</b>
                      </ListSubheader>
                      {pokemonMoves.map((itemMoves, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            style={{ color: "blue" }}
                            primary={itemMoves.move.name}
                          />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                </List>
              </Paper>
            </Box>
          ) : null}
        </Grid>
        <Grid item xs>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              bgcolor: "#32CD32",
              "& > :not(style)": {
                m: 1,
                width: "100%",
              },
            }}
          >
            <Paper elevation={3}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  "& ul": { padding: 0 },
                }}
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    <h2>
                      <b>Favorite</b>
                    </h2>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={handleClickDeleteFav}
                    >
                      Delete
                    </Button>
                  </ListSubheader>
                }
              >
                <li>
                  <ul>
                    {favTable.map((element, index) => (
                      <ListSubheader key={index}>{element}</ListSubheader>
                    ))}
                  </ul>
                </li>
              </List>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
