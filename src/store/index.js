import { create } from "zustand";
import { persist } from "zustand/middleware";
import mediaSlice from "./media-slice";
import userSlice from "./user-slice";

export default {
  media: create(persist(mediaSlice, { name: "media" })),
  user: create(persist(userSlice, { name: "user", })),
};
