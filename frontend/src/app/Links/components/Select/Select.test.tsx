import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import getMockState from "@/utils/getMockState";

import Select from ".";

const mockStore = configureMockStore();

describe("Select Component", () => {
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
        <Select id="1" onChange={() => {}} platformSelected="GitHub" />
      </Provider>
    );
  });

  it("should open platform list", () => {
    render(
      <Provider store={store}>
        <Select id="1" onChange={() => {}} platformSelected="GitHub" />
      </Provider>
    );

    const buttonOpen = screen.getByRole("button");
    fireEvent.click(buttonOpen);

    const FrontendMentorText = screen.getByText("Frontend Mentor");
    expect(FrontendMentorText).toBeInTheDocument();

    const TwitterText = screen.getByText("Twitter");
    expect(TwitterText).toBeInTheDocument();
  });
});
