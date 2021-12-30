import { renderHook } from "@testing-library/react-hooks";
import { AllTheProviders, render, screen } from "@utils/test";
import { act } from "react-test-renderer";
import ConfirmDialog from "./ConfirmDialog";
import useConfirmDialog from "./useConfirmDialog";

test("Confirm Dialog", () => {
  const { result } = renderHook(() => useConfirmDialog(), {
    wrapper: AllTheProviders,
  });

  const DIALOG_TITLE_TEST = "Confirm Dialog Title Test";

  act(() => {
    result.current.setDialog({
      title: DIALOG_TITLE_TEST,
      message: "message",
      onConfirm: () => {},
    });
    render(<ConfirmDialog />);
  });

  expect(screen.getByText(DIALOG_TITLE_TEST)).toBeVisible();

  act(() => {
    result.current.closeDialog();
  });

  expect(screen.queryByText(DIALOG_TITLE_TEST)).not.toBeVisible();
});
