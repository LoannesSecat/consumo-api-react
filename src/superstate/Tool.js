import { ls } from "@superstate/adapters";
import { superstate } from "@superstate/core";
import MediaC from "~/superstate/Media";

const ToolC = {
  state: superstate({
    PAGE: 1,
    MIN_PAGE: 1,
    TOTAL_PAGES: 1,
    SEARCH_TEXT: "",
  })
    .use([ls("MP_TOOL")]),

  newPage: (page) => {
    ToolC.state.set((prev) => ({
      ...prev,
      PAGE: page || 1,
    }));
  },

  nextMediaPage: () => {
    ToolC.state.set((prev) => ({ ...prev, PAGE: prev.PAGE + 1 }));
    MediaC.readMedia();
  },

  previousMediaPage: () => {
    ToolC.state.set((prev) => ({ ...prev, PAGE: prev.PAGE - 1 }));
    MediaC.readMedia();
  },

  searchText: (text) => {
    ToolC.state.set((prev) => ({ ...prev, SEARCH_TEXT: text || "" }));
  },

  totalPages: (numPages) => {
    ToolC.state.set((prev) => ({ ...prev, TOTAL_PAGES: numPages }));
  },
};

export default ToolC;
