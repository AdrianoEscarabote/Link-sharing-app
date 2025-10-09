import { render, screen } from "@testing-library/react";

import Alert from ".";

describe("Alert Save Changes Component", () => {
  it("should render correctly", () => {
    render(
      <Alert
        altImage="icon copied to clipboard"
        imgPath="/assets/icon-link-copied-to-clipboard.svg"
        text="The link has been copied to your clipboard!"
        show={true}
      />
    );
  });

  it("should pass props correctly", () => {
    render(
      <Alert
        altImage="icon copied to clipboard"
        imgPath="/assets/icon-link-copied-to-clipboard.svg"
        text="The link has been copied to your clipboard!"
        show={true}
      />
    );

    const element = screen.getByText(
      "The link has been copied to your clipboard!"
    );

    expect(element).toBeInTheDocument();
  });
});
