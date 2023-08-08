import { render, screen } from "@testing-library/react";
import PreviewLink from ".";

describe("Preview Link Component", () => {
  it("should render correctly", () => {
    render(
      <PreviewLink
        label="GitHub"
        link="www.github.com/AdrianoEscarabote"
        size="small"
      />
    );
  });

  it("should pass props correctly", () => {
    render(
      <PreviewLink
        label="GitHub"
        link="www.github.com/AdrianoEscarabote"
        size="small"
      />
    );

    const element = screen.getByText("GitHub");

    expect(element).toBeInTheDocument();
  });
});
