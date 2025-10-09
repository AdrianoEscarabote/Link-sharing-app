import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import getMockState from "@/utils/getMockState";

import Form from ".";

const mockStore = configureMockStore();

describe("Profile Details Form Component", () => {
  let store;

  beforeEach(() => {
    const mockState = getMockState();
    const state = mockStore(mockState);

    store = state;
  });

  afterAll(() => jest.clearAllMocks());

  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  });

  it("should change input values ​​correctly", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const firstNameInput = screen.getByPlaceholderText("e.g. John");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput).toHaveValue("John");

    const lastNameInput = screen.getByPlaceholderText("e.g. Appleseed");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput).toHaveValue("Doe");

    const emailInput = screen.getByPlaceholderText("e.g. email@example.com");
    fireEvent.change(emailInput, { target: { value: "preview@email.com" } });
    expect(emailInput).toHaveValue("preview@email.com");
  });
});
