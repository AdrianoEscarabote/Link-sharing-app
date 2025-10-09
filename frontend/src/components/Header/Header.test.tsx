/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockstore from "redux-mock-store";

import getMockState from "../../utils/getMockState";
import Header from ".";

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
