import { render, screen } from "@testing-library/react";

import Tab from ".";

describe("Tab Component", () => {
  it("should render correctly", () => {
    render(
      <Tab
        label="Home"
        active={true}
        imagePath="/assets/icon-links-header.svg"
        href="/"
      />
    );
  });

  it("should pass props correctly", () => {
    render(
      <Tab
        label="Home"
        active={true}
        href="/"
        imagePath="/assets/icon-links-header.svg"
      />
    );

    const element = screen.getByText("Home");

    expect(element).toBeInTheDocument();
  });
});
