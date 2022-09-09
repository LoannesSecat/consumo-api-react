export const Reducers = {
  media: {
    resources: [],
    filmDetails: [],
    personDetails: [],
    serieDetails: [],
    typeMedia: "",
  },
  user: {},
  tool: {
    page: 1,
    minPage: 1,
    totalPages: 1,
    alertMessage:
    {
      msg: "",
      color: "",
    },
    searchText: "",
  },
};

export const ToolReducer = {
  page: 1,
  minPage: 1,
  totalPages: 1,
  alertMessage: { msg: "", color: "" },
  searchText: "",
};
