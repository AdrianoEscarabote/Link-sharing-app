import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { PlatformsName } from "@/redux/root-reducer-types";

type LinkItem = { id: string; link: string; platform: PlatformsName };

const genId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const ensureUniqueId = (items: LinkItem[], candidate: string) => {
  let id = candidate;
  const used = new Set(items.map((l) => l.id));
  while (used.has(id)) id = genId();
  return id;
};

const userLinksSlice = createSlice({
  name: "User Links",
  initialState: { links: [] as LinkItem[] },
  reducers: {
    setNewLink: (
      state,
      {
        payload,
      }: PayloadAction<{ id: string; link: string; platform: PlatformsName }>
    ) => {
      const id = ensureUniqueId(state.links, payload.id);
      state.links.push({ ...payload, id });
    },
    removeLink: (state, { payload }: PayloadAction<{ idToRemove: string }>) => {
      state.links = state.links.filter((l) => l.id !== payload.idToRemove);
    },
    setData: (state, { payload }: PayloadAction<LinkItem[]>) => {
      state.links = payload.map((l) => ({ ...l }));
    },
    changeValue: (
      state,
      { payload }: PayloadAction<{ idToUpdate: string; newValue: string }>
    ) => {
      const item = state.links.find((l) => l.id === payload.idToUpdate);
      if (item && item.link !== payload.newValue) item.link = payload.newValue;
    },
    changeSelectValue: (
      state,
      {
        payload,
      }: PayloadAction<{ idToUpdate: string; platformSelected: PlatformsName }>
    ) => {
      const item = state.links.find((l) => l.id === payload.idToUpdate);
      if (item && item.platform !== payload.platformSelected) {
        item.platform = payload.platformSelected;
      }
    },

    handleResetLinks: (state) => {
      state.links = [];
    },

    udpatedLinksId: (state) => {
      return state;
    },
  },
});

export const {
  setNewLink,
  removeLink,
  handleResetLinks,
  setData,
  changeValue,
  changeSelectValue,
  udpatedLinksId,
} = userLinksSlice.actions;
export default userLinksSlice.reducer;
