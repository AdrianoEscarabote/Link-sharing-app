import { render, screen } from "@testing-library/react";

import Input from ".";

describe("Input component", () => {
  it("should render correctly", () => {
    render(<Input type="text" data-testid="input" />);

    const input = screen.getByTestId("input");

    expect(input).toBeInTheDocument();
  });

  it("should pass the props correctly", () => {
    render(
      <Input
        type="text"
        data-testid="input"
        style={{ backgroundColor: "black" }}
        aria-label="input text"
      />
    );

    const input = screen.getByTestId("input");

    expect(input).toHaveStyle("background-color: rgb(0, 0, 0)");
    expect(input).toHaveAttribute("aria-label");
  });
});
