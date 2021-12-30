import { act, renderHook } from "@testing-library/react-hooks";
import { AllTheProviders } from "@utils/test";
import useLogout from "./useLogout";

test("useLogout hook", () => {
  const { result } = renderHook(() => useLogout(), {
    wrapper: AllTheProviders,
  });
  global.localStorage.setItem("user", JSON.stringify({}));
  act(() => {
    result.current();
  });
  expect(global.localStorage.getItem("user")).toBeNull();
});
