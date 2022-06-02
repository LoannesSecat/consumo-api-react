import Empty from "./Empty";
import Loading from "./Loading";

export default function HandleLoading({ data, component }) {
  if (data === "loading") return <Loading />;

  return Object.keys(data).length ? component : <Empty />;
}
