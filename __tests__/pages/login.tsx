import { render } from "@utils/test";
import LoginPage from "../../pages/login";

it("renders homepage unchanged", () => {
  const { container } = render(<LoginPage />);
  expect(container).toMatchSnapshot();
});
