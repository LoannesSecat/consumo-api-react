export const Reducers = {
  film: {
    films: [],
    film_details: [],
    person_details: [],
    serie_details: [],
    type_media: ''
  },
  user: {},
  tool: {
    page: 1,
    min_page: 1,
    total_pages: 1,
    alert_message:
    {
      msg: '',
      color: ''
    },
    search_text: ''
  }
}

export const ToolReducer = {
  page: 1,
  min_page: 1,
  total_pages: 1,
  alert_message: { msg: "", color: "" },
  search_text: "",
}