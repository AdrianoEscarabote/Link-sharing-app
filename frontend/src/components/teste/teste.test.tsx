import { render, screen } from "@testing-library/react";
import Teste from ".";

describe("test component", () => {
  it("should render correctly", () => {
    render(<Teste />);

    const title = screen.getByText("Testeee");
    expect(title).toBeTruthy();
  });
});
