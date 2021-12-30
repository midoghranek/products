import { useTranslate } from "@hooks";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  closeConfirmDialog,
  confirmDialogSelector,
} from "./ConfirmDialog.store";

const ConfirmDialog = () => {
  const { message } = useTranslate();
  const dispatch = useDispatch();
  const closeDialog = () => {
    dispatch(closeConfirmDialog());
  };
  const {
    open,
    title,
    onConfirm,
    message: dialogMessage,
  } = useSelector(confirmDialogSelector);

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={closeDialog}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{dialogMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={closeDialog}>
          {message("CANCEL")}
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={onConfirm as VoidFunction}
        >
          {message("CONFIRM")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
