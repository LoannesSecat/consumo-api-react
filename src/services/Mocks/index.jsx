import useStore from "@/hooks/useStore";
import FilmsData from "./Films";
import SelectedFilm from "./SelectedFilm";

const Mocks = () => {
  const page = useStore({ reducer: "tool", value: "page" });

  return {
    SelectedFilm,
    Films: {
      total_pages: Object.keys(FilmsData).length,
      results: FilmsData[page - 1],
    },
  };
};

export default Mocks;
