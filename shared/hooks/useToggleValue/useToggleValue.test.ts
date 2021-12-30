import { renderHook, act } from "@testing-library/react-hooks";
import useToggleValue from "./useToggleValue";

test("useLogout hook", () => {
  const { result } = renderHook(() => useToggleValue());
  expect(result.current[0]).toBe(false);
  act(() => {
    result.current[1]();
  });
  expect(result.current[0]).toBe(true);
});
