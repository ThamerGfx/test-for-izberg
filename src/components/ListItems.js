import React from "react";

// IMPORT ELEMENTS
import Grid from "@mui/material/Grid";
import { ListItemButton } from "@mui/material";
import { SimpleDialog } from "./Dialog";

export default function ListItems({
  allDataPokemon,
  handleClickDetails,
  handleClickFav,
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});

  const handleClickOpen = (item) => {
    setOpen(true);
    setSelectedValue(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container item spacing={3}>
        {allDataPokemon?.map((pok, index) => (
          <>
            <Grid item xs={4}>
              <ListItemButton
                onClick={() => handleClickOpen(pok)}
                key={index}
                sx={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: "primary.dark",
                  color: "black",
                }}
              >
                {pok.name}
              </ListItemButton>
            </Grid>
          </>
        ))}
        <SimpleDialog
          selectedValue={selectedValue}
          handleClickDetails={handleClickDetails}
          handleClickFav={handleClickFav}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </div>
  );
}
