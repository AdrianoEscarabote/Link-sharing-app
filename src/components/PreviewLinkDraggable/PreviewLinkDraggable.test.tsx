import { render, screen } from "@testing-library/react";
import PreviewLinkDraggable from ".";

describe("Preview Link Draggable", () => {
  it("should render correctly", () => {
    render(
      <PreviewLinkDraggable
        index={1}
        label="GitHub"
        link="www.github.com/AdrianoEscarabote"
        size="small"
      />
    );
  });

  it("should pass props correctly", () => {
    render(
      <PreviewLinkDraggable
        index={1}
        label="GitHub"
        link="www.github.com/AdrianoEscarabote"
        size="small"
      />
    );

    const element = screen.getByText("GitHub");

    expect(element).toBeInTheDocument();
  });
});
