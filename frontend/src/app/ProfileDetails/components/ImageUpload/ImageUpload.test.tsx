import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import getMockState from "@/utils/getMockState";

import ImageUpload from ".";

const mockStore = configureMockStore();

describe("Image Upload Component", () => {
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
        <ImageUpload />
      </Provider>
    );
  });
});
