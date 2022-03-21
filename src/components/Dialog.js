import React from "react";

// IMPORT ELEMENTS
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StarIcon from "@mui/icons-material/Star";

export function SimpleDialog({
  handleClickDetails,
  handleClickFav,
  open,
  onClose,
  selectedValue,
}) {
  const handleClose = () => {
    onClose();
  };

  const detailsItem = (item) => {
    handleClickDetails(item.url);
    onClose();
  };

  const favoriteItem = (item) => {
    handleClickFav(item);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Actions</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button onClick={() => detailsItem(selectedValue)}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <ListAltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Details" />
        </ListItem>
        <ListItem button onClick={() => favoriteItem(selectedValue)}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <StarIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Favorite" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
