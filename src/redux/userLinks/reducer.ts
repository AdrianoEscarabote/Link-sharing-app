import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  linksType,
  removeLinkType,
  setLinksType,
  changeValueType,
  changeSelectValueType,
} from "./userLinksTypes";

interface initialStateType {
  links: linksType[];
}

const initialState: initialStateType = {
  links: [],
};

const userLinksSlice = createSlice({
  name: "User Links",
  initialState,
  reducers: {
    setNewLink: (state, action: PayloadAction<setLinksType>) => {
      const { link, platform } = action.payload;
      if (!link && !platform) {
        return;
      }
      if (state.links.map((item) => item.platform === platform)[0]) {
        return;
      }
      const id = `${state.links.length + 1}`;

      state.links.push({
        link,
        platform,
        id,
      });
    },

    setData: (state, action: PayloadAction<setLinksType[]>) => {
      if (action.payload.length !== 0) {
        state.links = action.payload;
      }
    },

    udpatedLinksId: (state) => {
      state.links = state.links.map((link, index) => ({
        ...link,
        id: `${index + 1}`,
      }));
    },

    removeLink: (state, action: PayloadAction<removeLinkType>) => {
      const { idToRemove } = action.payload;
      const number = Number(idToRemove);
      state.links.splice(number - 1, 1);
    },

    changeValue: (state, action: PayloadAction<changeValueType>) => {
      const { idToUpdate, newValue } = action.payload;
      if (idToUpdate && newValue) {
        state.links = state.links.map((link) => {
          if (link.id === idToUpdate) {
            return {
              ...link,
              link: newValue,
            };
          }
          return {
            ...link,
          };
        });
      }
    },

    handleResetLinks: (state, action: PayloadAction) => {
      return initialState;
    },

    changeSelectValue: (
      state,
      action: PayloadAction<changeSelectValueType>
    ) => {
      const { platformSelected, idToUpdate } = action.payload;

      if (platformSelected && idToUpdate) {
        state.links = state.links.map((link) => {
          if (link.id === idToUpdate) {
            link.platform = platformSelected;
          }
          return {
            ...link,
          };
        });
      }
    },
  },
});

export const {
  udpatedLinksId,
  setNewLink,
  setData,
  removeLink,
  changeValue,
  changeSelectValue,
  handleResetLinks,
} = userLinksSlice.actions;

export default userLinksSlice.reducer;
