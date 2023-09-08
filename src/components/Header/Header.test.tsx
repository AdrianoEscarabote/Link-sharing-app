import { render } from "@testing-library/react";
import Header from ".";
import { Provider } from "react-redux";
import configureMockstore from "redux-mock-store";
import getMockState from "../../utils/getMockState";

const mockStore = configureMockstore();

describe("Header Component", () => {
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
        <Header />
      </Provider>
    );
  });
});
