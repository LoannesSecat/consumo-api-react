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
  searchText: "",
};

export const UserReducer = {
  userData: [],
  token: [],
  session: false,
};

export const Reducers = {
  media: MediaReducer,
  user: UserReducer,
  tool: ToolReducer,
};
