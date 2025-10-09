import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockstore from "redux-mock-store";

import getMockState from "../../../../../utils/getMockState";
import HeaderPreview from ".";

const mockStore = configureMockstore();

describe("Header Preview", () => {
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
        <HeaderPreview />
      </Provider>
    );
  });
});
