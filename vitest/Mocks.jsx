export const MediaReducer = {
  resources: [],
  filmDetails: [],
  personDetails: [],
  serieDetails: [],
  typeMedia: "",
};

export const ToolReducer = {
  page: 1,
  minPage: 1,
  totalPages: 1,
  alertMessage: { msg: "", color: "" },
  searchText: "",
};

export const UserReducer = {
  user: [],
  email: "",
  pass: "",
  token: "",
};

export const Reducers = {
  media: MediaReducer,
  user: UserReducer,
  tool: ToolReducer,
};
