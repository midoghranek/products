import { renderHook, act } from "@testing-library/react-hooks";
import { AllTheProviders } from "@utils/test";
import useSwitchLang from "./useSwitchLang";

test("useSwitchLang hook", () => {
  const { result } = renderHook(() => useSwitchLang(), {
    wrapper: AllTheProviders,
  });
  act(() => result.current.switchLang());
  expect(result.current.locale).toBe("en");
  act(() => result.current.switchLang());
  expect(result.current.locale).toBe("ar");
});
