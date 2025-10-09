import { render, screen } from "@testing-library/react";

import LinkPrimary from ".";

describe("Link Primary test", () => {
  it("should render correctly", () => {
    render(<LinkPrimary disabled={false} label="Link" href="/" />);
  });

  it("should pass props correctly", () => {
    render(<LinkPrimary label="Link Primary" href="/" disabled={false} />);

    const element = screen.getByText("Link Primary");

    expect(element).toBeInTheDocument();
  });
});
