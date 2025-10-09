import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import getMockState from "@/utils/getMockState";

import ImageContainer from ".";

const mockStore = configureMockStore();

describe("Image Container Component", () => {
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
        <ImageContainer />
      </Provider>
    );
  });
});
