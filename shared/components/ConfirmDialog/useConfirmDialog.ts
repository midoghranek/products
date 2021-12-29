import { ConfirmDialogIntialProps } from "@types";
import { useDispatch } from "react-redux";
import { closeConfirmDialog, openConfirmDialog } from "./ConfirmDialog.store";

const useConfirmDialog = () => {
  const dispatch = useDispatch();
  const closeDialog = () => {
    dispatch(closeConfirmDialog());
    return Promise.resolve();
  };

  const setDialog: (props: ConfirmDialogIntialProps) => void = (props) => {
    dispatch(openConfirmDialog(props));
  };

  return { closeDialog, setDialog };
};

export default useConfirmDialog;
