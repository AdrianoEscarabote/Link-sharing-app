import { fireEvent, render, screen } from "@testing-library/react";

import ByttonSecondary from "./index";

describe("Button Secondary", () => {
  it("should render correctly with props being passed", () => {
    const onClickFn = jest.fn();

    render(
      <ByttonSecondary
        disabled={false}
        label="Click"
        type="button"
        data-testid="button-id"
        onClick={onClickFn}
      />
    );

    const button = screen.getByTestId("button-id");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type");
    fireEvent.click(button);
    expect(onClickFn).toHaveBeenCalled();
  });
});
