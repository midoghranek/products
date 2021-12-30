import { renderHook } from "@testing-library/react-hooks";
import useTranslate from "./useTranslate";
import { AllTheProviders } from "@utils/test";

test("useLogout hook", () => {
  const { result } = renderHook(() => useTranslate(), {
    wrapper: AllTheProviders,
  });
  const site_title = result.current.message("SITE_NAME");
  expect(site_title).toBe("Online Products");
});
