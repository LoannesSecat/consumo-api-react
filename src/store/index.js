import { create } from "zustand";
import { persist } from "zustand/middleware";
import mediaSlice from "./mediaSlice";
import userSlice from "./userSlice";

export default {
  media: create(persist(mediaSlice, { name: "media" })),
  user: create(persist(userSlice, { name: "user" }))
}
