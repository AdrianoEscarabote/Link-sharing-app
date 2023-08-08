import { render, screen } from "@testing-library/react";
import PhoneMockup from ".";
import { Provider } from "react-redux";
import configureMockstore from "redux-mock-store";
import getMockState from "../../testsUtils/getMockState";

const mockStore = configureMockstore();

describe("Phone Mockup Component", () => {
  let store: any;

  beforeEach(() => {
    const mockState = getMockState();
    const state = mockStore(mockState);

    store = state;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <PhoneMockup />
      </Provider>
    );
  });

  it("should get data from redux and display it correctly", async () => {
    render(
      <Provider store={store}>
        <PhoneMockup />
      </Provider>
    );

    const name = await screen.findByText("adriano last name");
    const email = await screen.findByText("adrianopreview@email.com");

    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
});
