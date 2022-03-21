import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

export default function ListItemsDetails({
  pokemonAbilities,
  pokemonGameIndices,
  pokemonMoves,
}) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "primary.dark",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={
        <ListSubheader
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "primary.dark",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}>
          <h2>
            <b>Details Pokemon</b>
          </h2>
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
                style={{ color: "white" }}
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
                style={{ color: "white" }}
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
                style={{ color: "white" }}
                primary={itemMoves.move.name}
              />
            </ListItem>
          ))}
        </ul>
      </li>
    </List>
  );
}
