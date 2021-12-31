import { render, screen, act } from "@utils/test";
import LoginForm from "./LoginForm";
import fireEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it("should render", () => {
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("should show required error when fields are empty", async () => {
    await act(async () => {
      fireEvent.click(screen.getByTestId("login-button"));
    });
    expect(screen.getAllByText(/is required/i)).toHaveLength(2);
  });
});
