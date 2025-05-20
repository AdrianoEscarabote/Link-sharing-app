import { render, screen } from "@testing-library/react";
import PhoneMockup from ".";
import { Provider } from "react-redux";
import configureMockstore from "redux-mock-store";
import getMockState from "@/utils/getMockState";

const mockStore = configureMockstore();

const id = 1;
const index = 1;
jest.mock("react-dnd", () => ({
  useDrag: () => [
    {
      type: "LINK",
      item: { id, index },
    },
    jest.fn(),
  ],
  useDrop: () => [{}, jest.fn()],
  DndProvider: jest.fn(),
}));

jest.mock("react-dnd-html5-backend", () => ({
  HTML5Backend: jest.fn(),
}));

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
