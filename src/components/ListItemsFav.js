import * as React from "react";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";

export default function ListItemsFav({ favTable, handleClickDeleteFav }) {
  const [open, setOpen] = React.useState(false);
  const [seeBtnHide, setSeeBtnHide] = React.useState(false);
  const [seeBtnList, setSeeBtnList] = React.useState(true);
  const handleOpen = () => {
    setOpen(true);
    setSeeBtnList(false);
    setSeeBtnHide(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSeeBtnHide(false);
    setSeeBtnList(true);
  };

  return (
    <div>
      {seeBtnList ? <Button onClick={handleOpen}>See Favorites</Button> : null}
      {seeBtnHide ? (
        <Button onClick={handleClose}>
          Hide Favorites
        </Button>
      ) : null}
      {favTable.length !== 0 ? (
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={handleClickDeleteFav}
        >
          Delete
        </Button>
      ) : null}
      {open ? (
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
                <b>Favorites</b>
              </h2>
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
      ) : null}
    </div>
  );
}
