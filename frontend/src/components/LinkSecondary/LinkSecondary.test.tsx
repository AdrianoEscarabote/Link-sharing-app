import { render, screen } from "@testing-library/react";

import LinkSecondary from ".";

describe("Link Secondary Component", () => {
  it("should render correctly", () => {
    render(<LinkSecondary href="/" disabled={false} label="Link Secondary" />);
  });

  it("should pass props correctly", () => {
    render(<LinkSecondary href="/" disabled={false} label="Link Secondary" />);

    const element = screen.getByText("Link Secondary");

    expect(element).toBeInTheDocument();
  });
});
