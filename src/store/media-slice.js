const initialState = {
  data: [],
  details: {},
  mediaSelectedType: "",
  isSuccess: false,
  isLoading: false,
  isError: false,
  isDone: false,
  page: 1,
  totalPages: 1,
  filterText: "",
  totalResults: 0,
  auxMediaDetails: null,
};

const mediaSlice = (set) => ({
  ...initialState,

  changePage: (page = 1) => {
    set((prev) => ({ ...prev, page }));
  },

  changeSearchText: (text = "") => {
    set((prev) => ({ ...prev, filterText: text || "" }));
  },

  changeAuxMediaDetails: (data) => {
    set((state) => ({ ...state, auxMediaDetails: data }));
  },
});

export default mediaSlice;
